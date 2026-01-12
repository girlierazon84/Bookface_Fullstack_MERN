// backend/src/controllers/userController.ts

import type { Request, Response } from "express";
import statusCode from "../config/statusCode";
import userModel from "../models/userModel";
import logger from "../utils/logger";
import { replaceMedia } from "../services/mediaService";
import { destroyByPublicId } from "../services/cloudinary";
import {
    updateMeSchema,
    searchUsersSchema,
    userIdParamsSchema
} from "../schemas/user.schema";


const safeUserSelect =
    "username firstname lastname email avatarUrl avatarPublicId coverUrl coverPublicId bio savedPosts createdAt updatedAt";

const getErrorMessage = (error: unknown) => (error instanceof Error ? error.message : "Unknown error");

// GET /users
const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await userModel.find().select(safeUserSelect).lean();
        return res.status(statusCode.OK).send(users);
    } catch (error) {
        logger.error("Failed to fetch users", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

// GET /users/:userId
const getUserById = async (req: Request, res: Response) => {
    try {
        const parsed = userIdParamsSchema.safeParse(req.params);
        if (!parsed.success) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send({ message: "Validation failed", errors: parsed.error.flatten() });
        }

        const user = await userModel.findById(parsed.data.userId).select(safeUserSelect).lean();
        if (!user) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        return res.status(statusCode.OK).send(user);
    } catch (error) {
        logger.error("Failed to fetch user by id", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

// GET /users/search?username=...
const searchUsers = async (req: Request, res: Response) => {
    try {
        const parsed = searchUsersSchema.safeParse(req.query);
        if (!parsed.success) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send({ message: "Validation failed", errors: parsed.error.flatten() });
        }

        const username = parsed.data.username.trim();

        const users = await userModel
            .find({ username: { $regex: username, $options: "i" } })
            .select(safeUserSelect)
            .limit(20)
            .lean();

        return res.status(statusCode.OK).send(users);
    } catch (error) {
        logger.error("Failed to search users", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

// GET /users/me
const getMe = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const me = await userModel.findById(req.user.id).select(safeUserSelect).lean();
        if (!me) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        return res.status(statusCode.OK).send(me);
    } catch (error) {
        logger.error("Failed to fetch me", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

// PATCH /users/me
const updateMe = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const parsed = updateMeSchema.safeParse(req.body);
        if (!parsed.success) {
            return res
                .status(statusCode.BAD_REQUEST)
                .send({ message: "Validation failed", errors: parsed.error.flatten() });
        }

        const updated = await userModel
            .findByIdAndUpdate(req.user.id, parsed.data, { new: true })
            .select(safeUserSelect);

        if (!updated) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        return res.status(statusCode.OK).send(updated);
    } catch (error) {
        logger.error("Failed to update me", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

// POST /users/me/avatar (multipart: avatar)
const uploadMyAvatar = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });
        if (!req.file) return res.status(statusCode.BAD_REQUEST).send({ message: "Missing avatar file" });

        const me = await userModel.findById(req.user.id);
        if (!me) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        const uploaded = await replaceMedia({
            previousPublicId: me.avatarPublicId || undefined,
            file: req.file,
            folder: "bookface/avatars"
        });

        me.avatarUrl = uploaded.url;
        me.avatarPublicId = uploaded.publicId;
        await me.save();

        const safe = await userModel.findById(me._id).select(safeUserSelect).lean();
        return res.status(statusCode.OK).send(safe);
    } catch (error) {
        logger.error("Failed to upload avatar", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to upload avatar" });
    }
};

// DELETE /users/me/avatar
const deleteMyAvatar = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const me = await userModel.findById(req.user.id);
        if (!me) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        if (me.avatarPublicId) await destroyByPublicId(me.avatarPublicId);

        me.avatarUrl = "";
        me.avatarPublicId = "";
        await me.save();

        const safe = await userModel.findById(me._id).select(safeUserSelect).lean();
        return res.status(statusCode.OK).send(safe);
    } catch (error) {
        logger.error("Failed to delete avatar", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to delete avatar" });
    }
};

// POST /users/me/cover (multipart: cover)
const uploadMyCover = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });
        if (!req.file) return res.status(statusCode.BAD_REQUEST).send({ message: "Missing cover file" });

        const me = await userModel.findById(req.user.id);
        if (!me) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        const uploaded = await replaceMedia({
            previousPublicId: me.coverPublicId || undefined,
            file: req.file,
            folder: "bookface/covers"
        });

        me.coverUrl = uploaded.url;
        me.coverPublicId = uploaded.publicId;
        await me.save();

        const safe = await userModel.findById(me._id).select(safeUserSelect).lean();
        return res.status(statusCode.OK).send(safe);
    } catch (error) {
        logger.error("Failed to upload cover", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to upload cover" });
    }
};

// DELETE /users/me/cover
const deleteMyCover = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const me = await userModel.findById(req.user.id);
        if (!me) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        if (me.coverPublicId) await destroyByPublicId(me.coverPublicId);

        me.coverUrl = "";
        me.coverPublicId = "";
        await me.save();

        const safe = await userModel.findById(me._id).select(safeUserSelect).lean();
        return res.status(statusCode.OK).send(safe);
    } catch (error) {
        logger.error("Failed to delete cover", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to delete cover" });
    }
};

// DELETE /users/me
const deleteMe = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const me = await userModel.findById(req.user.id);
        if (!me) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        // clean up stored media (best-effort)
        await Promise.allSettled([
            me.avatarPublicId ? destroyByPublicId(me.avatarPublicId) : Promise.resolve(),
            me.coverPublicId ? destroyByPublicId(me.coverPublicId) : Promise.resolve()
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
