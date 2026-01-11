// backend/src/controllers/feedController.ts

import type { Request, Response } from "express";
import statusCode from "../config/statusCode";
import logger from "../utils/logger";
import postModel from "../models/postModel";
import userModel from "../models/userModel";


const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

const getFeed = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });
        }

        const limit = Math.min(Number(req.query.limit ?? DEFAULT_LIMIT), MAX_LIMIT);
        const cursor = req.query.cursor ? new Date(String(req.query.cursor)) : null;

        const me = await userModel.findById(userId).select("friends").lean();
        if (!me) {
            return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });
        }

        const authors = [userId, ...(me.friends ?? []).map((id) => id.toString())];

        const query: Record<string, unknown> = { author: { $in: authors } };
        if (cursor) query.createdAt = { $lt: cursor };

        const posts = await postModel.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate("author", "username firstname lastname avatarUrl")
            .lean();

        const nextCursor = posts.length ? posts[posts.length - 1].createdAt : null;

        return res.status(statusCode.OK).send({
            items: posts,
            nextCursor
        });
    } catch (error: unknown) {
        logger.error("getFeed failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to load feed" });
    }
};

export default { getFeed };
