// backend/src/controllers/postController.ts

import type { Request, Response } from "express";
import statusCode from "../config/statusCode";
import postModel from "../models/postModel";
import userModel from "../models/userModel";
import logger from "../utils/logger";
import { uploadMany } from "../services/mediaService";
import { destroyByPublicId, isCloudinaryConfigured } from "../services/cloudinary";
import { createPostBodySchema, updatePostBodySchema, postIdSchema } from "../schemas/post.schema";
import { deleteMediaParamsSchema } from "../schemas/media.schema";


const AUTHOR_SELECT = "username firstname lastname avatarUrl coverUrl";

export const createPost = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const parsed = createPostBodySchema.safeParse({ content: String(req.body?.content ?? "") });
        if (!parsed.success) {
            return res.status(statusCode.BAD_REQUEST).send({ message: "Validation failed", errors: parsed.error.flatten() });
        }

        const content = parsed.data.content?.trim() ?? "";
        const files = ((req.files as Express.Multer.File[] | undefined) ?? []).filter(Boolean);

        // ✅ enforce: content OR media (before any uploads)
        if (!content && files.length === 0) {
            return res.status(statusCode.BAD_REQUEST).send({ message: "Post must include content or media" });
        }

        // ✅ if user attached media but Cloudinary not configured => clear 400
        if (files.length > 0 && !isCloudinaryConfigured()) {
            return res.status(statusCode.BAD_REQUEST).send({
                message:
                    "Media upload is not available. Configure Cloudinary env vars (CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET)."
            });
        }

        const media = files.length ? await uploadMany(files, "bookface/posts") : [];

        const post = await postModel.create({
            author: req.user.id,
            content: content || " ", // allow media-only posts while schema requires content
            media,
            imageUrl: media.find((m) => m.type === "image")?.url ?? "" // legacy
        });

        const populated = await post.populate("author", AUTHOR_SELECT);
        return res.status(statusCode.CREATED).send(populated);
    } catch (error) {
        logger.error("createPost failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to create post" });
    }
};

export const getAllPosts = async (_req: Request, res: Response) => {
    try {
        const posts = await postModel.find().sort({ createdAt: -1 }).populate("author", AUTHOR_SELECT);
        return res.status(statusCode.OK).send(posts);
    } catch {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to load posts" });
    }
};

export const getPostById = async (req: Request, res: Response) => {
    try {
        const p1 = postIdSchema.safeParse(req.params);
        if (!p1.success) return res.status(statusCode.BAD_REQUEST).send({ message: "Invalid postId", errors: p1.error.flatten() });

        const post = await postModel.findById(p1.data.postId).populate("author", AUTHOR_SELECT);
        if (!post) return res.status(statusCode.NOT_FOUND).send({ message: "Post not found" });

        return res.status(statusCode.OK).send(post);
    } catch {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to load post" });
    }
};

export const updatePost = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const p1 = postIdSchema.safeParse(req.params);
        if (!p1.success) return res.status(statusCode.BAD_REQUEST).send({ message: "Invalid postId", errors: p1.error.flatten() });

        const parsed = updatePostBodySchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(statusCode.BAD_REQUEST).send({ message: "Validation failed", errors: parsed.error.flatten() });
        }

        const post = await postModel.findById(p1.data.postId);
        if (!post) return res.status(statusCode.NOT_FOUND).send({ message: "Post not found" });
        if (post.author.toString() !== req.user.id) return res.status(statusCode.FORBIDDEN).send({ message: "Not allowed" });

        if (typeof parsed.data.content === "string") post.content = parsed.data.content;

        await post.save();

        const populated = await post.populate("author", AUTHOR_SELECT);
        return res.status(statusCode.OK).send(populated);
    } catch (error) {
        logger.error("updatePost failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to update post" });
    }
};

export const deletePost = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const p1 = postIdSchema.safeParse(req.params);
        if (!p1.success) return res.status(statusCode.BAD_REQUEST).send({ message: "Invalid postId", errors: p1.error.flatten() });

        const post = await postModel.findById(p1.data.postId);
        if (!post) return res.status(statusCode.NOT_FOUND).send({ message: "Post not found" });
        if (post.author.toString() !== req.user.id) return res.status(statusCode.FORBIDDEN).send({ message: "Not allowed" });

        if (post.media?.length) await Promise.all(post.media.map((m) => destroyByPublicId(m.publicId, m.type)));

        await postModel.findByIdAndDelete(p1.data.postId);
        return res.status(statusCode.OK).send({ message: "Post deleted" });
    } catch {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to delete post" });
    }
};

export const deletePostMediaItem = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const parsed = deleteMediaParamsSchema.safeParse(req.params);
        if (!parsed.success) {
            return res.status(statusCode.BAD_REQUEST).send({ message: "Validation failed", errors: parsed.error.flatten() });
        }

        const post = await postModel.findById(parsed.data.postId);
        if (!post) return res.status(statusCode.NOT_FOUND).send({ message: "Post not found" });
        if (post.author.toString() !== req.user.id) return res.status(statusCode.FORBIDDEN).send({ message: "Not allowed" });

        const target = post.media.find((m) => m.publicId === parsed.data.publicId);
        if (!target) return res.status(statusCode.NOT_FOUND).send({ message: "Media not found" });

        post.media = post.media.filter((m) => m.publicId !== parsed.data.publicId);

        await destroyByPublicId(target.publicId, target.type);

        post.imageUrl = post.media.find((m) => m.type === "image")?.url ?? "";
        await post.save();

        const populated = await post.populate("author", AUTHOR_SELECT);
        return res.status(statusCode.OK).send(populated);
    } catch (error) {
        logger.error("deletePostMediaItem failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to delete media" });
    }
};

export const toggleLike = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const p1 = postIdSchema.safeParse(req.params);
        if (!p1.success) return res.status(statusCode.BAD_REQUEST).send({ message: "Invalid postId", errors: p1.error.flatten() });

        const post = await postModel.findById(p1.data.postId);
        if (!post) return res.status(statusCode.NOT_FOUND).send({ message: "Post not found" });

        const userId = req.user.id;
        const alreadyLiked = post.likes.some((id) => id.toString() === userId);

        post.likes = alreadyLiked ? post.likes.filter((id) => id.toString() !== userId) : [...post.likes, userId as any];
        await post.save();

        const populated = await post.populate("author", AUTHOR_SELECT);
        return res.status(statusCode.OK).send(populated);
    } catch {
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to toggle like" });
    }
};

export const toggleSave = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const p1 = postIdSchema.safeParse(req.params);
        if (!p1.success) return res.status(statusCode.BAD_REQUEST).send({ message: "Invalid postId", errors: p1.error.flatten() });

        const post = await postModel.findById(p1.data.postId).select("_id").lean();
        if (!post) return res.status(statusCode.NOT_FOUND).send({ message: "Post not found" });

        const me = await userModel.findById(req.user.id);
        if (!me) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        const postId = post._id.toString();
        const alreadySaved = me.savedPosts.some((p) => p.toString() === postId);

        if (alreadySaved) me.savedPosts = me.savedPosts.filter((p) => p.toString() !== postId);
        else me.savedPosts.push(post._id as any);

        await me.save();

        return res.status(statusCode.OK).send({ saved: !alreadySaved });
    } catch (error) {
        logger.error("toggleSave failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to toggle save" });
    }
};

export const copyPost = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const p1 = postIdSchema.safeParse(req.params);
        if (!p1.success) return res.status(statusCode.BAD_REQUEST).send({ message: "Invalid postId", errors: p1.error.flatten() });

        const src = await postModel.findById(p1.data.postId).lean();
        if (!src) return res.status(statusCode.NOT_FOUND).send({ message: "Post not found" });

        const copied = await postModel.create({
            author: req.user.id,
            content: src.content,
            media: src.media ?? [],
            imageUrl: src.imageUrl ?? ""
        });

        const populated = await copied.populate("author", AUTHOR_SELECT);
        return res.status(statusCode.CREATED).send(populated);
    } catch (error) {
        logger.error("copyPost failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to copy post" });
    }
};

export const getMySavedPosts = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const me = await userModel.findById(req.user.id).select("savedPosts").lean();
        if (!me) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        const posts = await postModel
            .find({ _id: { $in: me.savedPosts ?? [] } })
            .sort({ createdAt: -1 })
            .populate("author", AUTHOR_SELECT);

        return res.status(statusCode.OK).send(posts);
    } catch (error) {
        logger.error("getMySavedPosts failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to fetch saved posts" });
    }
};
