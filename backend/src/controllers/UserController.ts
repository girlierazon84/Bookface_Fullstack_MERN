// backend/src/controllers/userController.ts

import type { Request, Response } from "express";
import statusCode from "../config/statusCode";
import userModel from "../models/userModel";
import logger from "../utils/logger";
import {
    replaceMedia,
    MediaServiceError,
    type UploadedMedia
} from "../services/mediaService";
import { destroyByPublicId } from "../services/cloudinary";
import { isCloudinaryConfigured } from "../utils/env";
import {
    updateMeSchema,
    searchUsersSchema,
    userIdParamsSchema
} from "../schemas/user.schema";


const SAFE_USER_SELECT =
    "username firstname lastname email avatarUrl coverUrl bio savedPosts createdAt updatedAt";

const getErrorMessage = (error: unknown) => (error instanceof Error ? error.message : "Unknown error");

/**---------------
    GET /users
------------------*/
const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await userModel.find().select(SAFE_USER_SELECT).lean();
        return res.status(statusCode.OK).send(users);
    } catch (error) {
        logger.error("Failed to fetch users", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

/**-----------------------
    GET /users/:userId
--------------------------*/
const getUserById = async (req: Request, res: Response) => {
    try {
        const parsed = userIdParamsSchema.safeParse(req.params);
        if (!parsed.success) {
            return res.status(statusCode.BAD_REQUEST).send({
                message: "Validation failed",
                errors: parsed.error.flatten()
            });
        }

        const user = await userModel.findById(parsed.data.userId).select(SAFE_USER_SELECT).lean();
        if (!user) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        return res.status(statusCode.OK).send(user);
    } catch (error) {
        logger.error("Failed to fetch user by id", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

/**-----------------------------------
    GET /users/search?username=...
--------------------------------------*/
const searchUsers = async (req: Request, res: Response) => {
    try {
        const parsed = searchUsersSchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(statusCode.BAD_REQUEST).send({
                message: "Validation failed",
                errors: parsed.error.flatten()
            });
        }

        const username = parsed.data.username.trim();

        const users = await userModel
            .find({ username: { $regex: username, $options: "i" } })
            .select(SAFE_USER_SELECT)
            .limit(20)
            .lean();

        return res.status(statusCode.OK).send(users);
    } catch (error) {
        logger.error("Failed to search users", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

/**------------------
    GET /users/me
---------------------*/
const getMe = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const me = await userModel.findById(req.user.id).select(SAFE_USER_SELECT).lean();
        if (!me) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        return res.status(statusCode.OK).send(me);
    } catch (error) {
        logger.error("Failed to fetch me", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

/**--------------------
    PATCH /users/me
-----------------------*/
const updateMe = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const parsed = updateMeSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(statusCode.BAD_REQUEST).send({
                message: "Validation failed",
                errors: parsed.error.flatten()
            });
        }

        const updated = await userModel
            .findByIdAndUpdate(req.user.id, parsed.data, { new: true })
            .select(SAFE_USER_SELECT);

        if (!updated) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        return res.status(statusCode.OK).send(updated);
    } catch (error) {
        logger.error("Failed to update me", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

const mapMediaError = (e: unknown, res: Response) => {
    if (e instanceof MediaServiceError) {
        return res.status(e.status).send({ message: e.message, code: e.code });
    }
    return null;
};

/**----------------------------------------------------
    POST /users/me/avatar (multipart field: avatar)
-------------------------------------------------------*/
const uploadMyAvatar = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });
        if (!req.file) return res.status(statusCode.BAD_REQUEST).send({ message: "Missing avatar file" });

        if (!isCloudinaryConfigured()) {
            return res.status(503).send({
                message: "Media upload is not configured. Set CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET."
            });
        }

        const me = await userModel.findById(req.user.id);
        if (!me) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        let uploaded: UploadedMedia;
        try {
            uploaded = await replaceMedia({
                previousPublicId: me.avatarPublicId || undefined,
                previousType: "image",
                file: req.file,
                folder: "bookface/avatars"
            });
        } catch (e) {
            const handled = mapMediaError(e, res);
            if (handled) return handled;
            throw e;
        }

        me.avatarUrl = uploaded.url;
        me.avatarPublicId = uploaded.publicId;
        await me.save();

        const safe = await userModel.findById(me._id).select(SAFE_USER_SELECT).lean();
        return res.status(statusCode.OK).send(safe);
    } catch (error) {
        logger.error("Failed to upload avatar", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to upload avatar" });
    }
};

/**----------------------------
    DELETE /users/me/avatar
-------------------------------*/
const deleteMyAvatar = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const me = await userModel.findById(req.user.id);
        if (!me) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        // best-effort delete
        if (me.avatarPublicId) await destroyByPublicId(me.avatarPublicId, "image");

        me.avatarUrl = "";
        me.avatarPublicId = "";
        await me.save();

        const safe = await userModel.findById(me._id).select(SAFE_USER_SELECT).lean();
        return res.status(statusCode.OK).send(safe);
    } catch (error) {
        logger.error("Failed to delete avatar", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to delete avatar" });
    }
};

/**--------------------------------------------------
    POST /users/me/cover (multipart field: cover)
-----------------------------------------------------*/
const uploadMyCover = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });
        if (!req.file) return res.status(statusCode.BAD_REQUEST).send({ message: "Missing cover file" });

        if (!isCloudinaryConfigured()) {
            return res.status(503).send({
                message: "Media upload is not configured. Set CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET."
            });
        }

        const me = await userModel.findById(req.user.id);
        if (!me) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        let uploaded: UploadedMedia;
        try {
            uploaded = await replaceMedia({
                previousPublicId: me.coverPublicId || undefined,
                previousType: "image",
                file: req.file,
                folder: "bookface/covers"
            });
        } catch (e) {
            const handled = mapMediaError(e, res);
            if (handled) return handled;
            throw e;
        }

        me.coverUrl = uploaded.url;
        me.coverPublicId = uploaded.publicId;
        await me.save();

        const safe = await userModel.findById(me._id).select(SAFE_USER_SELECT).lean();
        return res.status(statusCode.OK).send(safe);
    } catch (error) {
        logger.error("Failed to upload cover", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to upload cover" });
    }
};

/**---------------------------
    DELETE /users/me/cover
------------------------------*/
const deleteMyCover = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const me = await userModel.findById(req.user.id);
        if (!me) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        if (me.coverPublicId) await destroyByPublicId(me.coverPublicId, "image");

        me.coverUrl = "";
        me.coverPublicId = "";
        await me.save();

        const safe = await userModel.findById(me._id).select(SAFE_USER_SELECT).lean();
        return res.status(statusCode.OK).send(safe);
    } catch (error) {
        logger.error("Failed to delete cover", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to delete cover" });
    }
};

/**---------------------
    DELETE /users/me
------------------------*/
const deleteMe = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const me = await userModel.findById(req.user.id);
        if (!me) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        await Promise.allSettled([
            me.avatarPublicId ? destroyByPublicId(me.avatarPublicId, "image") : Promise.resolve(),
            me.coverPublicId ? destroyByPublicId(me.coverPublicId, "image") : Promise.resolve()
        ]);

        await userModel.deleteOne({ _id: me._id });
        return res.status(statusCode.OK).send({ message: "User deleted" });
    } catch (error) {
        logger.error("Failed to delete me", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

export default {
    getAllUsers,
    getUserById,
    searchUsers,
    getMe,
    updateMe,
    uploadMyAvatar,
    deleteMyAvatar,
    uploadMyCover,
    deleteMyCover,
    deleteMe
};
