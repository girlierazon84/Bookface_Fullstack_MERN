// backend/src/controllers/authController.ts

import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import statusCode from "../config/statusCode";
import userModel from "../models/userModel";
import { hashPassword, comparePassword } from "../utils/crypt";
import logger from "../utils/logger";
import { registerSchema, loginSchema } from "../schemas/auth.schema";


type JwtPayload = { id: string; username: string };

const signToken = (payload: JwtPayload) => {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN ?? "7d";
    if (!secret) throw new Error("JWT_SECRET is not set");
    return jwt.sign(payload, secret, { expiresIn });
};

const toAuthUser = (user: {
    _id: unknown;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    avatarUrl?: string;
    coverUrl?: string;
    bio?: string;
}) => ({
    _id: String(user._id),
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    username: user.username,
    avatarUrl: user.avatarUrl ?? "",
    coverUrl: user.coverUrl ?? "",
    bio: user.bio ?? ""
});

export const register = async (req: Request, res: Response) => {
    try {
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(statusCode.BAD_REQUEST).send({
                message: "Validation failed",
                errors: parsed.error.flatten()
            });
        }

        const firstname = parsed.data.firstname.trim();
        const lastname = parsed.data.lastname.trim();
        const email = parsed.data.email.trim().toLowerCase();
        const username = parsed.data.username.trim();
        const password = parsed.data.password;

        const exists = await userModel.findOne({ $or: [{ email }, { username }] }).select("_id").lean();
        if (exists) return res.status(statusCode.BAD_REQUEST).send({ message: "User already exists" });

        const passwordHash = await hashPassword(password);

        const user = await userModel.create({
            firstname,
            lastname,
            email,
            username,
            passwordHash
        });

        const token = signToken({ id: user._id.toString(), username: user.username });

        return res.status(statusCode.CREATED).send({ token, user: toAuthUser(user) });
    } catch (error: unknown) {
        logger.error("Register failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Register failed" });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            return res.status(statusCode.BAD_REQUEST).send({
                message: "Validation failed",
                errors: parsed.error.flatten()
            });
        }

        const identifierRaw = parsed.data.username.trim();
        const password = parsed.data.password;

        const identifier = identifierRaw.toLowerCase();

        const user = await userModel.findOne({
            $or: [{ username: identifierRaw }, { email: identifier }]
        });

        if (!user) return res.status(statusCode.UNAUTHORIZED).send({ message: "Invalid credentials" });

        const ok = await comparePassword(password, user.passwordHash);
        if (!ok) return res.status(statusCode.UNAUTHORIZED).send({ message: "Invalid credentials" });

        const token = signToken({ id: user._id.toString(), username: user.username });

        return res.status(statusCode.OK).send({ token, user: toAuthUser(user) });
    } catch (error: unknown) {
        logger.error("Login failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Login failed" });
    }
};

export const me = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        const user = await userModel.findById(req.user.id).select("-passwordHash");
        if (!user) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        return res.status(statusCode.OK).send(user);
    } catch (error: unknown) {
        logger.error("Fetch /auth/me failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to fetch user" });
    }
};
