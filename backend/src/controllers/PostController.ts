// backend/src/controllers/postController.ts

import type { Request, Response } from "express";
import statusCode from "../config/statusCode";
import postModel from "../models/postModel";
import userModel from "../models/userModel";
import logger from "../utils/logger";
import {
    createPostBodySchema,
    updatePostBodySchema
} from "../schemas/post.schema";
import {
    uploadBuffer,
    deleteByPublicId
} from "../services/cloudinary";


const inferMediaType = (mime: string) => (mime.startsWith("video/") ? "video" : "image") as const;

export const createPost = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const parsed = createPostBodySchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(statusCode.BAD_REQUEST).send({ message: "Validation failed", errors: parsed.error.flatten() });
        }

        const content = parsed.data.content.trim();
        const files = (req.files as Express.Multer.File[] | undefined) ?? [];

        if (!content && files.length === 0) {
            return res.status(statusCode.BAD_REQUEST).send({ message: "Post must have content or media" });
        }

        const media = [];
        for (const f of files) {
            const type = inferMediaType(f.mimetype);
            const uploaded = await uploadBuffer(f.buffer, {
                folder: "bookface/posts",
                resource_type: type
            });

            media.push({ url: uploaded.url, publicId: uploaded.publicId, type });
        }

        const post = await postModel.create({
            author: req.user.id,
            content: content || " ", // keep required
            imageUrl: "",            // legacy
            media,
            likes: []
        });

        const populated = await post.populate("author", "username firstname lastname avatarUrl");
        return res.status(statusCode.CREATED).send(populated);
    } catch (error: unknown) {
        logger.error("Failed to create post", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to create post" });
    }
};

export const getAllPosts = async (_req: Request, res: Response) => {
    try {
        const posts = await postModel.find().sort({ createdAt: -1 }).populate("author", "username firstname lastname avatarUrl");
        return res.status(statusCode.OK).send(posts);
    } catch (error: unknown) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed", error });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const post = await postModel.findById(req.params.postId).populate("author", "username firstname lastname avatarUrl");
        if (!post) return res.status(statusCode.NOT_FOUND).send({ message: "Post not found" });
        return res.status(statusCode.OK).send(post);
    } catch (error: unknown) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed", error });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const parsed = updatePostBodySchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(statusCode.BAD_REQUEST).send({ message: "Validation failed", errors: parsed.error.flatten() });
        }

        const post = await postModel.findById(req.params.postId);
        if (!post) return res.status(statusCode.NOT_FOUND).send({ message: "Post not found" });

        if (post.author.toString() !== req.user.id) {
            return res.status(statusCode.FORBIDDEN).send({ message: "Not allowed" });
        }

        post.content = parsed.data.content;
        post.editedAt = new Date();
        await post.save();

        const populated = await post.populate("author", "username firstname lastname avatarUrl");
        return res.status(statusCode.OK).send(populated);
    } catch (error: unknown) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed", error });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const post = await postModel.findById(req.params.postId);
        if (!post) return res.status(statusCode.NOT_FOUND).send({ message: "Post not found" });

        if (post.author.toString() !== req.user.id) {
            return res.status(statusCode.FORBIDDEN).send({ message: "Not allowed" });
        }

        // delete media from cloud
        for (const m of post.media ?? []) {
            await deleteByPublicId(m.publicId, m.type);
        }

        await post.deleteOne();
        return res.status(statusCode.OK).send({ message: "Post deleted" });
    } catch (error: unknown) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed", error });
    }
};

export const toggleLike = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const post = await postModel.findById(req.params.postId);
        if (!post) return res.status(statusCode.NOT_FOUND).send({ message: "Post not found" });

        const userId = req.user.id;
        const alreadyLiked = post.likes.some((id) => id.toString() === userId);

        post.likes = alreadyLiked ? post.likes.filter((id) => id.toString() !== userId) : [...post.likes, userId as any];

        await post.save();
        logger.debug(`Post ${post._id} likes: ${post.likes.length}`);

        const populated = await post.populate("author", "username firstname lastname avatarUrl");
        return res.status(statusCode.OK).send(populated);
    } catch (error: unknown) {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed", error });
    }
};

// Save (bookmark) post
export const savePost = async (req: Request, res: Response) => {
    if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

    const user = await userModel.findById(req.user.id);
    if (!user) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

    await userModel.updateOne({ _id: user._id }, { $addToSet: { savedPosts: req.params.postId } });
    return res.status(statusCode.OK).send({ saved: true });
};

export const unsavePost = async (req: Request, res: Response) => {
    if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

    const user = await userModel.findById(req.user.id);
    if (!user) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

    await userModel.updateOne({ _id: user._id }, { $pull: { savedPosts: req.params.postId } });
    return res.status(statusCode.OK).send({ saved: false });
};

// Copy payload: return safe content for client-side copy (no duplication)
export const copyPostPayload = async (req: Request, res: Response) => {
    const post = await postModel.findById(req.params.postId).populate("author", "username");
    if (!post) return res.status(statusCode.NOT_FOUND).send({ message: "Post not found" });

    return res.status(statusCode.OK).send({
        text: post.content,
        author: post.author ? (post.author as any).username : "Unknown",
        createdAt: post.createdAt,
        mediaUrls: (post.media ?? []).map((m) => m.url)
    });
};
