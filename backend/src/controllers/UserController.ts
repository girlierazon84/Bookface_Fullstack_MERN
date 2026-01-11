// backend/src/controllers/userController.ts

import type { Request, Response } from "express";
import statusCode from "../config/statusCode";
import userModel from "../models/userModel";
import logger from "../utils/logger";
import {
    updateMeSchema,
    searchUsersSchema,
    userIdParamsSchema
} from "../schemas/user.schema";


const safeUserSelect = "username firstname lastname email avatarUrl coverUrl bio createdAt updatedAt";

const getErrorMessage = (error: unknown) =>
    error instanceof Error ? error.message : "Unknown error";

const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await userModel.find().select(safeUserSelect).lean();
        return res.status(statusCode.OK).send(users);
    } catch (error: unknown) {
        logger.error("Failed to fetch users", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

const getUserById = async (req: Request, res: Response) => {
    try {
        const parsed = userIdParamsSchema.safeParse(req.params);
        if (!parsed.success) {
            return res.status(statusCode.BAD_REQUEST).send({
                message: "Validation failed",
                errors: parsed.error.flatten()
            });
        }

        const user = await userModel.findById(parsed.data.userId).select(safeUserSelect).lean();
        if (!user) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        return res.status(statusCode.OK).send(user);
    } catch (error: unknown) {
        logger.error("Failed to fetch user by id", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

const searchUsers = async (req: Request, res: Response) => {
    try {
        const parsed = searchUsersSchema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(statusCode.BAD_REQUEST).send({
                message: "Validation failed",
                errors: parsed.error.flatten()
            });
        }

        const username = parsed.data.username.trim();

        // partial match, case-insensitive
        const users = await userModel
            .find({ username: { $regex: username, $options: "i" } })
            .select(safeUserSelect)
            .limit(20)
            .lean();

        return res.status(statusCode.OK).send(users);
    } catch (error: unknown) {
        logger.error("Failed to search users", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

// PATCH /users/me
const updateMe = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const parsed = updateMeSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(statusCode.BAD_REQUEST).send({
                message: "Validation failed",
                errors: parsed.error.flatten()
            });
        }

        const updated = await userModel
            .findByIdAndUpdate(req.user.id, parsed.data, { new: true })
            .select(safeUserSelect);

        if (!updated) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        return res.status(statusCode.OK).send(updated);
    } catch (error: unknown) {
        logger.error("Failed to update me", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

// DELETE /users/me
const deleteMe = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const deleted = await userModel.findByIdAndDelete(req.user.id).select(safeUserSelect);
        if (!deleted) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        return res.status(statusCode.OK).send({ message: "User deleted" });
    } catch (error: unknown) {
        logger.error("Failed to delete me", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

export default {
    getAllUsers,
    getUserById,
    searchUsers,
    updateMe,
    deleteMe
};
