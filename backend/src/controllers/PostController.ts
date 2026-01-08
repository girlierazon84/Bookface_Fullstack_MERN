// backend/src/controllers/PostController.ts

import type { Request, Response } from "express";
import StatusCode from "../configurations/StatusCode";
import PostModel from "../models/PostModel";
import Logger from "../utils/Logger";


export const createPost = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(StatusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const { content, imageUrl } = req.body;
        if (!content) return res.status(StatusCode.BAD_REQUEST).send({ message: "content is required" });

        const post = await PostModel.create({
            author: req.user.id,
            content: String(content),
            imageUrl: imageUrl ? String(imageUrl) : ""
        });

        const populated = await post.populate("author", "username firstname lastname avatarUrl");
        return res.status(StatusCode.CREATED).send(populated);
    } catch (error: unknown) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to create post", error });
    }
};

export const getAllPosts = async (_req: Request, res: Response) => {
    try {
        const posts = await PostModel.find()
            .sort({ createdAt: -1 })
            .populate("author", "username firstname lastname avatarUrl");
        return res.status(StatusCode.OK).send(posts);
    } catch (error: unknown) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed", error });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await PostModel.findById(req.params.postId).populate(
            "author",
            "username firstname lastname avatarUrl"
        );
        if (!post) return res.status(StatusCode.NOT_FOUND).send({ message: "Post not found" });
        return res.status(StatusCode.OK).send(post);
    } catch (error: unknown) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed", error });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(StatusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const post = await PostModel.findById(req.params.postId);
        if (!post) return res.status(StatusCode.NOT_FOUND).send({ message: "Post not found" });

        if (post.author.toString() !== req.user.id) {
            return res.status(StatusCode.FORBIDDEN).send({ message: "Not allowed" });
        }

        await PostModel.findByIdAndDelete(req.params.postId);
        return res.status(StatusCode.OK).send({ message: "Post deleted" });
    } catch (error: unknown) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed", error });
    }
};

export const toggleLike = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(StatusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const post = await PostModel.findById(req.params.postId);
        if (!post) return res.status(StatusCode.NOT_FOUND).send({ message: "Post not found" });

        const userId = req.user.id;
        const alreadyLiked = post.likes.some((id) => id.toString() === userId);

        if (alreadyLiked) {
            post.likes = post.likes.filter((id) => id.toString() !== userId);
        } else {
            post.likes.push(userId as any);
        }

        await post.save();
        Logger.debug(`Post ${post._id} likes: ${post.likes.length}`);

        const populated = await post.populate("author", "username firstname lastname avatarUrl");
        return res.status(StatusCode.OK).send(populated);
    } catch (error: unknown) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed", error });
    }
};
