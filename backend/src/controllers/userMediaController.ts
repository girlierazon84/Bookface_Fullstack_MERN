// backend/src/controllers/userMediaController.ts

import type { Request, Response } from "express";
import statusCode from "../config/statusCode";
import userModel from "../models/userModel";
import logger from "../utils/logger";
import { replaceMedia } from "../services/mediaService";
import { destroyByPublicId } from "../services/cloudinary";


const safeUserSelect = "username firstname lastname email avatarUrl coverUrl bio createdAt updatedAt savedPosts";

export const uploadMyAvatar = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });
        if (!req.file) return res.status(statusCode.BAD_REQUEST).send({ message: "Missing avatar file" });

        const me = await userModel.findById(req.user.id);
        if (!me) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        const uploaded = await replaceMedia({
            previousPublicId: me.avatarPublicId,
            file: req.file,
            folder: "bookface/avatars"
        });

        me.avatarUrl = uploaded.url;
        me.avatarPublicId = uploaded.publicId;
        await me.save();

        const fresh = await userModel.findById(me._id).select(safeUserSelect).lean();
        return res.status(statusCode.OK).send(fresh);
    } catch (error: unknown) {
        logger.error("uploadMyAvatar failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to upload avatar" });
    }
};

export const deleteMyAvatar = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const me = await userModel.findById(req.user.id);
        if (!me) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        if (me.avatarPublicId) await destroyByPublicId(me.avatarPublicId);

        me.avatarUrl = "";
        me.avatarPublicId = "";
        await me.save();

        const fresh = await userModel.findById(me._id).select(safeUserSelect).lean();
        return res.status(statusCode.OK).send(fresh);
    } catch (error: unknown) {
        logger.error("deleteMyAvatar failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to delete avatar" });
    }
};

export const uploadMyCover = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });
        if (!req.file) return res.status(statusCode.BAD_REQUEST).send({ message: "Missing cover file" });

        const me = await userModel.findById(req.user.id);
        if (!me) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        const uploaded = await replaceMedia({
            previousPublicId: me.coverPublicId,
            file: req.file,
            folder: "bookface/covers"
        });

        me.coverUrl = uploaded.url;
        me.coverPublicId = uploaded.publicId;
        await me.save();

        const fresh = await userModel.findById(me._id).select(safeUserSelect).lean();
        return res.status(statusCode.OK).send(fresh);
    } catch (error: unknown) {
        logger.error("uploadMyCover failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to upload cover" });
    }
};

export const deleteMyCover = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const me = await userModel.findById(req.user.id);
        if (!me) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        if (me.coverPublicId) await destroyByPublicId(me.coverPublicId);

        me.coverUrl = "";
        me.coverPublicId = "";
        await me.save();

        const fresh = await userModel.findById(me._id).select(safeUserSelect).lean();
        return res.status(statusCode.OK).send(fresh);
    } catch (error: unknown) {
        logger.error("deleteMyCover failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to delete cover" });
    }
};
