import type { Request, Response } from "express";
import StatusCode from "../configurations/StatusCode";
import UserModel from "../models/UserModel";
import type { CreateNewUser } from "../utils/interfaces/Users";
import Logger from "../utils/Logger";
import crypt from "../utils/crypt";


const getErrorMessage = (error: unknown) =>
    error instanceof Error ? error.message : "Unknown error";

interface VerifyUserResponse {
    message: boolean;
}

interface SearchForUser {
    username: string;
}

const createUser = async (req: Request, res: Response) => {
    try {
        Logger.http(req.body);

        const { firstname, lastname, email, username, password } = req.body as CreateNewUser;

        const hashedPassword = await crypt.createPassword(password);

        const user = new UserModel({
            firstname,
            lastname,
            email,
            username,
            password: hashedPassword
        });

        Logger.debug(user);

        const saved = await user.save();
        Logger.debug(saved);

        res.status(StatusCode.CREATED).send(saved);
    } catch (error: unknown) {
        Logger.error("Failed to create user", error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

const verifyUser = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body as { username?: string; password?: string };
        Logger.http(req.body);

        if (!username || !password) {
            return res.status(StatusCode.BAD_REQUEST).send({ message: "username and password are required" });
        }

        const query: SearchForUser = { username: String(username) };

        const user = await UserModel.findOne(query);

        if (!user) {
            const response: VerifyUserResponse = { message: false };
            return res.status(StatusCode.OK).send(response);
        }

        const ok = await crypt.comparePassword(String(password), String(user.password));
        const response: VerifyUserResponse = { message: ok };

        res.status(StatusCode.OK).send(response);
    } catch (error: unknown) {
        Logger.error("Failed to verify user", error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: `Error occurred while trying to verify user`,
            error: getErrorMessage(error)
        });
    }
};

const getAllUsers = async (_req: Request, res: Response) => {
    try {
        const users = await UserModel.find();
        Logger.debug(users);
        res.status(StatusCode.OK).send(users);
    } catch (error: unknown) {
        Logger.error("Failed to fetch users", error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: getErrorMessage(error) });
    }
};

const getUserWithId = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        Logger.http(`userId: ${userId}`);

        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(StatusCode.NOT_FOUND).send({ message: `User not found: ${userId}` });
        }

        res.status(StatusCode.OK).send(user);
    } catch (error: unknown) {
        Logger.error("Failed to fetch user by id", error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: `Error occurred while trying to retrieve user with ID: ${req.params.userId}`,
            error: getErrorMessage(error)
        });
    }
};

const getUserWithQuery = async (req: Request, res: Response) => {
    try {
        const { username } = req.query;
        Logger.http(`username: ${username}`);

        if (!username) {
            return res.status(StatusCode.BAD_REQUEST).send({ message: "username query param is required" });
        }

        const query: SearchForUser = { username: String(username) };

        const users = await UserModel.find(query);
        Logger.debug(users);

        return users.length !== 0
            ? res.status(StatusCode.OK).send(users)
            : res.status(StatusCode.NOT_FOUND).send({ message: `Couldn't find user with username: ${username}` });
    } catch (error: unknown) {
        Logger.error("Failed to fetch user by query", error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Error occurred while trying to retrieve user with query",
            error: getErrorMessage(error)
        });
    }
};

const updateUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        Logger.http(`userId: ${userId}`);
        Logger.http(req.body);

        if (!req.body || Object.keys(req.body).length === 0) {
            return res.status(StatusCode.BAD_REQUEST).send({ message: "Can't update with empty body" });
        }

        const { firstname, lastname, email, username, password } = req.body as Partial<CreateNewUser>;

        const update: Partial<CreateNewUser> = {
            firstname,
            lastname,
            email,
            username
        };

        if (password) {
            update.password = await crypt.createPassword(password);
        }

        const updated = await UserModel.findByIdAndUpdate(userId, update, { new: true });

        if (!updated) {
            return res.status(StatusCode.NOT_FOUND).send({ message: `User not found: ${userId}` });
        }

        res.status(StatusCode.OK).send(updated);
    } catch (error: unknown) {
        Logger.error("Failed to update user", error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: `Error occurred while trying to update user with ID: ${req.params.userId}`,
            error: getErrorMessage(error)
        });
    }
};

const deleteUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const deleted = await UserModel.findByIdAndDelete(userId);

        if (!deleted) {
            return res.status(StatusCode.NOT_FOUND).send({ message: `User not found: ${userId}` });
        }

        res.status(StatusCode.OK).send({
            message: `Successfully deleted user with username: ${deleted.username} and ID: ${userId}`
        });
    } catch (error: unknown) {
        Logger.error("Failed to delete user", error);
        res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: `Error occurred while trying to delete user with ID: ${req.params.userId}`,
            error: getErrorMessage(error)
        });
    }
};

export default {
    createUser,
    verifyUser,
    getAllUsers,
    getUserWithId,
    getUserWithQuery,
    updateUser,
    deleteUser
};
