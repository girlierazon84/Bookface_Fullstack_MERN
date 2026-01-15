// backend/src/controllers/authController.ts

import type { Request, Response } from "express";
import jwt from "jsonwebtoken";
import statusCode from "../config/statusCode";
import userModel from "../models/userModel";
import {
    hashPassword,
    comparePassword
} from "../utils/crypt";
import logger from "../utils/logger";
import {
    registerSchema,
    loginSchema
} from "../schemas/auth.schema";
import { getEnv, getRequiredEnv } from "../utils/env";
import type {
    JwtPayloadDTO,
    AuthUserDTO,
    AuthResponseDTO
} from "../interfaces/auth";


const signToken = (payload: JwtPayloadDTO) => {
    const secret = getRequiredEnv("JWT_SECRET");
    const expiresIn = getEnv("JWT_EXPIRES_IN") || "7d";
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
}): AuthUserDTO => ({
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

        // ✅ No extra trimming/lowercasing here — schema already normalized.
        const { firstname, lastname, email, username, password } = parsed.data;

        const exists = await userModel
            .findOne({ $or: [{ email }, { username }] })
            .select("_id")
            .lean();

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

        const body: AuthResponseDTO = { token, user: toAuthUser(user) };
        return res.status(statusCode.CREATED).send(body);
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

        /**------------------------------------------------
            ✅ parsed.data.username is already:
                - trimmed
                - lowercased if it looks like an email
        ---------------------------------------------------*/
        const identifier = parsed.data.username;
        const password = parsed.data.password;

        const isEmail = identifier.includes("@");

        const user = await userModel.findOne(
            isEmail ? { email: identifier } : { username: identifier }
        );

        if (!user) return res.status(statusCode.UNAUTHORIZED).send({ message: "Invalid credentials" });

        const ok = await comparePassword(password, user.passwordHash);
        if (!ok) return res.status(statusCode.UNAUTHORIZED).send({ message: "Invalid credentials" });

        const token = signToken({ id: user._id.toString(), username: user.username });

        const body: AuthResponseDTO = { token, user: toAuthUser(user) };
        return res.status(statusCode.OK).send(body);
    } catch (error: unknown) {
        logger.error("Login failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Login failed" });
    }
};

export const me = async (req: Request, res: Response) => {
    try {
        if (!req.user?.id) return res.status(statusCode.UNAUTHORIZED).send({ message: "Unauthorized" });

        // keep passwordHash out; return the same user shape your frontend expects
        const user = await userModel.findById(req.user.id).select("-passwordHash");
        if (!user) return res.status(statusCode.NOT_FOUND).send({ message: "User not found" });

        return res.status(statusCode.OK).send(user);
    } catch (error: unknown) {
        logger.error("Fetch /auth/me failed", error);
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({ message: "Failed to fetch user" });
    }
};
