// backend/src/controllers/CommentController.ts

import type { Request, Response } from "express";
import StatusCode from "../configurations/StatusCode";
import CommentModel from "../models/CommentModel";


export const getCommentsForPost = async (req: Request, res: Response) => {
    try {
        const comments = await CommentModel.find({ post: req.params.postId })
            .sort({ createdAt: 1 })
            .populate("author", "username firstname lastname avatarUrl");

        return res.status(StatusCode.OK).send(comments);
    } catch (error: unknown) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed", error });
    }
};

export const createComment = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(StatusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const { content } = req.body;
        if (!content) return res.status(StatusCode.BAD_REQUEST).send({ message: "content is required" });

        const comment = await CommentModel.create({
            post: req.params.postId,
            author: req.user.id,
            content: String(content)
        });

        const populated = await comment.populate("author", "username firstname lastname avatarUrl");
        return res.status(StatusCode.CREATED).send(populated);
    } catch (error: unknown) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed", error });
    }
};
