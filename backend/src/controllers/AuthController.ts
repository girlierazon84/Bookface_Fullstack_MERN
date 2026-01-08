// backend/src/controllers/AuthController.ts

import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

import StatusCode from "../configurations/StatusCode";
import UserModel from "../models/UserModel";
import { hashPassword, comparePassword } from "../utils/crypt";
import Logger from "../utils/Logger";


type JwtPayload = { id: string; username: string };

const signToken = (payload: JwtPayload) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN ?? "7d";

    if (!secret) {
        throw new Error("JWT_SECRET is not set");
    }

    return jwt.sign(payload, secret, { expiresIn });
};

const toAuthUser = (user: any) => ({
    _id: user._id,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    username: user.username,
    avatarUrl: user.avatarUrl,
    bio: user.bio
});

export const register = async (req: Request, res: Response) => {
    try {
        const firstname = String(req.body.firstname ?? "").trim();
        const lastname = String(req.body.lastname ?? "").trim();
        const email = String(req.body.email ?? "").trim().toLowerCase();
        const username = String(req.body.username ?? "").trim();
        const password = String(req.body.password ?? "");

        if (!firstname || !lastname || !email || !username || !password) {
            return res.status(StatusCode.BAD_REQUEST).send({ message: "Missing required fields" });
        }

        const exists = await UserModel.findOne({
            $or: [{ email }, { username }]
        }).select("_id");

        if (exists) {
            return res.status(StatusCode.BAD_REQUEST).send({ message: "User already exists" });
        }

        const passwordHash = await hashPassword(password);

        const user = await UserModel.create({
            firstname,
            lastname,
            email,
            username,
            passwordHash
        });

        const token = signToken({ id: user._id.toString(), username: user.username });

        return res.status(StatusCode.CREATED).send({
            token,
            user: toAuthUser(user)
        });
    } catch (error: unknown) {
        Logger.error("Register failed", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: "Register failed" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const username = String(req.body.username ?? "").trim();
        const password = String(req.body.password ?? "");

        if (!username || !password) {
            return res.status(StatusCode.BAD_REQUEST).send({ message: "Missing username/password" });
        }

        const user = await UserModel.findOne({ username });
        if (!user) {
            return res.status(StatusCode.UNAUTHORIZED).send({ message: "Invalid credentials" });
        }

        const ok = await comparePassword(password, user.passwordHash);
        if (!ok) {
            return res.status(StatusCode.UNAUTHORIZED).send({ message: "Invalid credentials" });
        }

        const token = signToken({ id: user._id.toString(), username: user.username });

        return res.status(StatusCode.OK).send({
            token,
            user: toAuthUser(user)
        });
    } catch (error: unknown) {
        Logger.error("Login failed", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: "Login failed" });
    }
};

export const me = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) {
            return res.status(StatusCode.UNAUTHORIZED).send({ message: "Unauthorized" });
        }

        const user = await UserModel.findById(req.user.id).select("-passwordHash");
        if (!user) {
            return res.status(StatusCode.NOT_FOUND).send({ message: "User not found" });
        }

        return res.status(StatusCode.OK).send(user);
    } catch (error: unknown) {
        Logger.error("Fetch /auth/me failed", error);
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to fetch user" });
    }
};
