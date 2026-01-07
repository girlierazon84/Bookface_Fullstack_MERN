import type { Request, Response } from "express";
import StatusCode from "../configurations/StatusCode";
import PostModel from "../models/PostModel";
import Logger from "../utils/Logger";
import type { CreateNewPost } from "../utils/interfaces/Posts";


const getErrorMessage = (error: unknown) =>
    error instanceof Error ? error.message : "Unknown error";

const createPost = async (req: Request, res: Response) => {
    try {
        Logger.http(req.body);

        const { author, title, content } = req.body as CreateNewPost;

        const post = new PostModel({ author, title, content });
        Logger.debug(post);

        const saved = await post.save();
        Logger.debug(saved);

        res.status(StatusCode.CREATED).send(saved);
    } catch (error: unknown) {
        Logger.error("Failed to create post", error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

const getAllPosts = async (_req: Request, res: Response) => {
    try {
        const posts = await PostModel.find();
        Logger.debug(posts);
        res.status(StatusCode.OK).send(posts);
    } catch (error: unknown) {
        Logger.error("Failed to fetch posts", error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

const getPostById = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        Logger.http(`postId: ${postId}`);

        const post = await PostModel.findById(postId);

        if (!post) {
            return res.status(StatusCode.NOT_FOUND).send({ message: `Post not found: ${postId}` });
        }

        res.status(StatusCode.OK).send(post);
    } catch (error: unknown) {
        Logger.error("Failed to fetch post by id", error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: `Error occurred while trying to retrieve post with ID: ${req.params.postId}`,
            error: getErrorMessage(error)
        });
    }
};

const updatePost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;
        Logger.http(`postId: ${postId}`);
        Logger.http(req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(StatusCode.BAD_REQUEST).send({ message: "Can't update with empty body" });
        }

        const { author, title, content } = req.body as Partial<CreateNewPost>;

        const updated = await PostModel.findByIdAndUpdate(
            postId,
            { author, title, content },
            { new: true }
        );

        if (!updated) {
            return res.status(StatusCode.NOT_FOUND).send({ message: `Post not found: ${postId}` });
        }

        res.status(StatusCode.OK).send(updated);
    } catch (error: unknown) {
        Logger.error("Failed to update post", error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: `Error occurred while trying to update post with ID: ${req.params.postId}`,
            error: getErrorMessage(error)
        });
    }
};

const deletePost = async (req: Request, res: Response) => {
    try {
        const { postId } = req.params;

        const deleted = await PostModel.findByIdAndDelete(postId);

        if (!deleted) {
            return res.status(StatusCode.NOT_FOUND).send({ message: `Post not found: ${postId}` });
        }

        res.status(StatusCode.OK).send({
            message: `Successfully deleted post with author: ${deleted.author} and ID: ${postId}`
        });
    } catch (error: unknown) {
        Logger.error("Failed to delete post", error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: `Error occurred while trying to delete post with ID: ${req.params.postId}`,
            error: getErrorMessage(error)
        });
    }
};

export default {
    createPost,
    getAllPosts,
    getPostById,
    updatePost,
    deletePost
};
