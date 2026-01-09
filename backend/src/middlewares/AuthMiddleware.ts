// backend/src/middlewares/AuthMiddleware.ts

import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import StatusCode from "../configurations/StatusCode";
import Logger from "../utils/Logger";


type JwtPayload = {
    id: string;
    username?: string;
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(StatusCode.UNAUTHORIZED).send({ message: "Missing Authorization header" });
    }

    // support "Bearer <token>" and "bearer <token>"
    const [scheme, token] = authHeader.split(" ");

    if (!scheme || scheme.toLowerCase() !== "bearer" || !token) {
        return res.status(StatusCode.UNAUTHORIZED).send({ message: "Missing Bearer token" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        Logger.error("JWT_SECRET is not set");
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({
            message: "Server auth misconfiguration"
        });
    }

    try {
        const payload = jwt.verify(token.trim(), secret) as JwtPayload;

        if (!payload?.id) {
            return res.status(StatusCode.UNAUTHORIZED).send({ message: "Invalid token payload" });
        }

        req.user = { id: payload.id, username: payload.username };
        return next();
    } catch (error: unknown) {
        Logger.warn("Invalid/expired token", error);
        return res.status(StatusCode.UNAUTHORIZED).send({ message: "Invalid/expired token" });
    }
};
