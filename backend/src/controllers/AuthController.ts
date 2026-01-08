// backend/src/controllers/AuthController.ts

import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import StatusCode from "../configurations/StatusCode";
import UserModel from "../models/UserModel";
import { hashPassword, comparePassword } from "../utils/crypt";


const signToken = (payload: { id: string; username: string }) => {
    const secret = process.env.JWT_SECRET!;
    const expiresIn = process.env.JWT_EXPIRES_IN ?? "7d";
    return jwt.sign(payload, secret, { expiresIn });
};

export const register = async (req: Request, res: Response) => {
    try {
        const { firstname, lastname, email, username, password } = req.body;

        if (!firstname || !lastname || !email || !username || !password) {
            return res.status(StatusCode.BAD_REQUEST).send({ message: "Missing required fields" });
        }

        const exists = await UserModel.findOne({
            $or: [{ email: String(email).toLowerCase() }, { username: String(username) }]
        });

        if (exists) {
            return res.status(StatusCode.BAD_REQUEST).send({ message: "User already exists" });
        }

        const passwordHash = await hashPassword(String(password));

        const user = await UserModel.create({
            firstname,
            lastname,
            email: String(email).toLowerCase(),
            username,
            passwordHash
        });

        const token = signToken({ id: user._id.toString(), username: user.username });

        return res.status(StatusCode.CREATED).send({
            token,
            user: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                username: user.username,
                avatarUrl: user.avatarUrl,
                bio: user.bio
            }
        });
    } catch (error: unknown) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: "Register failed", error });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(StatusCode.BAD_REQUEST).send({ message: "Missing username/password" });
        }

        const user = await UserModel.findOne({ username: String(username) });
        if (!user) return res.status(StatusCode.UNAUTHORIZED).send({ message: "Invalid credentials" });

        const ok = await comparePassword(String(password), user.passwordHash);
        if (!ok) return res.status(StatusCode.UNAUTHORIZED).send({ message: "Invalid credentials" });

        const token = signToken({ id: user._id.toString(), username: user.username });

        return res.status(StatusCode.OK).send({
            token,
            user: {
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                username: user.username,
                avatarUrl: user.avatarUrl,
                bio: user.bio
            }
        });
    } catch (error: unknown) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: "Login failed", error });
    }
};

export const me = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(StatusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const user = await UserModel.findById(req.user.id).select("-passwordHash");
        if (!user) return res.status(StatusCode.NOT_FOUND).send({ message: "User not found" });

        return res.status(StatusCode.OK).send(user);
    } catch (error: unknown) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed", error });
    }
};
