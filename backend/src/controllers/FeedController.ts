// backend/src/controllers/ FeedController.ts

import type { Request, Response } from "express";
import StatusCode from "../configurations/StatusCode";
import PostModel from "../models/PostModel";
import UserModel from "../models/UserModel";


export const getFeed = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(StatusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const me = await UserModel.findById(req.user.id).select("friends");
        if (!me) return res.status(StatusCode.NOT_FOUND).send({ message: "User not found" });

        const authors = [req.user.id, ...(me.friends ?? []).map((id) => id.toString())];

        const posts = await PostModel.find({ author: { $in: authors } })
            .sort({ createdAt: -1 })
            .limit(50)
            .populate("author", "username firstname lastname avatarUrl");

        return res.status(StatusCode.OK).send(posts);
    } catch (error: unknown) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to load feed", error });
    }
};
