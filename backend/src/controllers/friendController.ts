// backend/src/controllers/friendController.ts

import type { Request, Response } from "express";
import { Types } from "mongoose";
import statusCode from "../config/statusCode";
import logger from "../utils/logger";
import userModel from "../models/userModel";
import friendRequestModel from "../models/friendRequestModel";


const isValidObjectId = (id: string) => Types.ObjectId.isValid(id);

const sendFriendRequest = async (req: Request, res: Response) => {
    try {
        const { fromUserId, toUserId } = req.body as { fromUserId: string; toUserId: string };

        if (!fromUserId || !toUserId) {
            return res.status(statusCode.BAD_REQUEST).send({ message: "fromUserId and toUserId are required" });
        }
        if (!isValidObjectId(fromUserId) || !isValidObjectId(toUserId)) {
            return res.status(statusCode.BAD_REQUEST).send({ message: "Invalid user id format" });
        }
        if (fromUserId === toUserId) {
            return res.status(statusCode.BAD_REQUEST).send({ message: "You cannot friend yourself" });
        }

        const [fromUser, toUser] = await Promise.all([
            userModel.findById(fromUserId).lean(),
            userModel.findById(toUserId).lean()
        ]);

        if (!fromUser || !toUser) {
            return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });
        }

        // already friends?
        const alreadyFriends = await userModel.exists({
            _id: fromUserId,
            friends: new Types.ObjectId(toUserId)
        });

        if (alreadyFriends) {
            return res.status(statusCode.OK).send({ message: "Already friends" });
        }

        // request already exists?
        const existing = await friendRequestModel.findOne({
            $or: [
                { from: fromUserId, to: toUserId },
                { from: toUserId, to: fromUserId } // avoid duplicates in reverse direction
            ]
        });

        if (existing) {
            return res.status(statusCode.OK).send({
                message: "Friend request already exists",
                request: existing
            });
        }

        const requestDoc = await friendRequestModel.create({
            from: fromUserId,
            to: toUserId,
            status: "pending"
        });

        return res.status(statusCode.CREATED).send({
            message: "Friend request sent",
            request: requestDoc
        });
    } catch (error: unknown) {
        logger.error("sendFriendRequest failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to send friend request" });
    }
};

const getIncomingRequests = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params as { userId: string };

        if (!isValidObjectId(userId)) {
            return res.status(statusCode.BAD_REQUEST).send({ message: "Invalid user id format" });
        }

        const requests = await friendRequestModel.find({ to: userId, status: "pending" })
            .sort({ createdAt: -1 })
            .populate("from", "username firstname lastname avatarUrl")
            .lean();

        return res.status(statusCode.OK).send(requests);
    } catch (error: unknown) {
        logger.error("getIncomingRequests failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to fetch incoming requests" });
    }
};

const getOutgoingRequests = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params as { userId: string };

        if (!isValidObjectId(userId)) {
            return res.status(statusCode.BAD_REQUEST).send({ message: "Invalid user id format" });
        }

        const requests = await friendRequestModel.find({ from: userId, status: "pending" })
            .sort({ createdAt: -1 })
            .populate("to", "username firstname lastname avatarUrl")
            .lean();

        return res.status(statusCode.OK).send(requests);
    } catch (error: unknown) {
        logger.error("getOutgoingRequests failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to fetch outgoing requests" });
    }
};

const acceptFriendRequest = async (req: Request, res: Response) => {
    try {
        const { requestId } = req.params as { requestId: string };

        if (!isValidObjectId(requestId)) {
            return res.status(statusCode.BAD_REQUEST).send({ message: "Invalid request id format" });
        }

        const requestDoc = await friendRequestModel.findById(requestId);
        if (!requestDoc) {
            return res.status(statusCode.NOT_FOUND).send({ message: "Friend request not found" });
        }

        if (requestDoc.status !== "pending") {
            return res.status(statusCode.BAD_REQUEST).send({ message: `Request already ${requestDoc.status}` });
        }

        const fromId = requestDoc.from.toString();
        const toId = requestDoc.to.toString();

        // Make them friends (idempotent)
        await Promise.all([
            userModel.updateOne({ _id: fromId }, { $addToSet: { friends: toId } }),
            userModel.updateOne({ _id: toId }, { $addToSet: { friends: fromId } })
        ]);

        requestDoc.status = "accepted";
        await requestDoc.save();

        // Cleanup any reverse pending request (optional but nice)
        await friendRequestModel.deleteMany({
            status: "pending",
            $or: [
                { from: fromId, to: toId },
                { from: toId, to: fromId }
            ]
        });

        return res.status(statusCode.OK).send({ message: "Friend request accepted" });
    } catch (error: unknown) {
        logger.error("acceptFriendRequest failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to accept friend request" });
    }
};

const rejectFriendRequest = async (req: Request, res: Response) => {
    try {
        const { requestId } = req.params as { requestId: string };

        if (!isValidObjectId(requestId)) {
            return res.status(statusCode.BAD_REQUEST).send({ message: "Invalid request id format" });
        }

        const requestDoc = await friendRequestModel.findById(requestId);
        if (!requestDoc) {
            return res.status(statusCode.NOT_FOUND).send({ message: "Friend request not found" });
        }

        if (requestDoc.status !== "pending") {
            return res.status(statusCode.BAD_REQUEST).send({ message: `Request already ${requestDoc.status}` });
        }

        requestDoc.status = "rejected";
        await requestDoc.save();

        return res.status(statusCode.OK).send({ message: "Friend request rejected" });
    } catch (error: unknown) {
        logger.error("rejectFriendRequest failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to reject friend request" });
    }
};

// Cancel a pending request (sender cancels)
const cancelFriendRequest = async (req: Request, res: Response) => {
    try {
        const { requestId } = req.params as { requestId: string };

        if (!isValidObjectId(requestId)) {
            return res.status(statusCode.BAD_REQUEST).send({ message: "Invalid request id format" });
        }

        const deleted = await friendRequestModel.findOneAndDelete({ _id: requestId, status: "pending" });
        if (!deleted) {
            return res.status(statusCode.NOT_FOUND).send({ message: "Pending friend request not found" });
        }

        return res.status(statusCode.OK).send({ message: "Friend request cancelled" });
    } catch (error: unknown) {
        logger.error("cancelFriendRequest failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to cancel request" });
    }
};

const getFriends = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params as { userId: string };

        if (!isValidObjectId(userId)) {
            return res.status(statusCode.BAD_REQUEST).send({ message: "Invalid user id format" });
        }

        const user = await userModel.findById(userId)
            .populate("friends", "username firstname lastname avatarUrl")
            .lean();

        if (!user) {
            return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });
        }

        return res.status(statusCode.OK).send(user.friends ?? []);
    } catch (error: unknown) {
        logger.error("getFriends failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to fetch friends" });
    }
};

const unfriend = async (req: Request, res: Response) => {
    try {
        const { userId, friendId } = req.params as { userId: string; friendId: string };

        if (!isValidObjectId(userId) || !isValidObjectId(friendId)) {
            return res.status(statusCode.BAD_REQUEST).send({ message: "Invalid id format" });
        }

        await Promise.all([
            userModel.updateOne({ _id: userId }, { $pull: { friends: friendId } }),
            userModel.updateOne({ _id: friendId }, { $pull: { friends: userId } })
        ]);

        return res.status(statusCode.OK).send({ message: "Unfriended successfully" });
    } catch (error: unknown) {
        logger.error("unfriend failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to unfriend" });
    }
};

export default {
    sendFriendRequest,
    getIncomingRequests,
    getOutgoingRequests,
    acceptFriendRequest,
    rejectFriendRequest,
    cancelFriendRequest,
    getFriends,
    unfriend
};
