// backend/src/controllers/commentController.ts

import type { Request, Response } from "express";
import statusCode from "../config/statusCode";
import commentModel from "../models/commentModel";


export const getCommentsForPost = async (req: Request, res: Response) => {
    try {
        const comments = await commentModel.find({ post: req.params.postId })
            .sort({ createdAt: 1 })
            .populate("author", "username firstname lastname avatarUrl");

        return res.status(statusCode.OK).send(comments);
    } catch (error: unknown) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed", error });
    }
};

export const createComment = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const { content } = req.body;
        if (!content) return res.status(statusCode.BAD_REQUEST).send({ message: "content is required" });

        const comment = await commentModel.create({
            post: req.params.postId,
            author: req.user.id,
            content: String(content)
        });

        const populated = await comment.populate("author", "username firstname lastname avatarUrl");
        return res.status(statusCode.CREATED).send(populated);
    } catch (error: unknown) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed", error });
    }
};
