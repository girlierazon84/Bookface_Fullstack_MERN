// backend/src/controllers/FeedController.ts

import type { Request, Response } from "express";
import StatusCode from "../configurations/StatusCode";
import Logger from "../utils/Logger";

import PostModel from "../models/PostModel";
import UserModel from "../models/UserModel";


const DEFAULT_LIMIT = 20;
const MAX_LIMIT = 50;

const getFeed = async (req: Request, res: Response) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(StatusCode.UNAUTHORIZED).send({ message: "Unauthorized" });
        }

        const limit = Math.min(Number(req.query.limit ?? DEFAULT_LIMIT), MAX_LIMIT);
        const cursor = req.query.cursor ? new Date(String(req.query.cursor)) : null;

        const me = await UserModel.findById(userId).select("friends").lean();
        if (!me) {
            return res.status(StatusCode.NOT_FOUND).send({ message: "User not found" });
        }

        const authors = [userId, ...(me.friends ?? []).map((id) => id.toString())];

        const query: Record<string, unknown> = { author: { $in: authors } };
        if (cursor) query.createdAt = { $lt: cursor };

        const posts = await PostModel.find(query)
            .sort({ createdAt: -1 })
            .limit(limit)
            .populate("author", "username firstname lastname avatarUrl")
            .lean();

        const nextCursor = posts.length ? posts[posts.length - 1].createdAt : null;

        return res.status(StatusCode.OK).send({
            items: posts,
            nextCursor
        });
    } catch (error: unknown) {
        Logger.error("getFeed failed", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to load feed" });
    }
};

export default { getFeed };
