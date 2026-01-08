// backend/src/middlewares/AuthMiddleware.ts

import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import StatusCode from "../configurations/StatusCode";
import Logger from "../utils/Logger";


type JwtUserPayload = {
    id: string;
    username?: string;
};

// Extend Express Request type so req.user is recognized everywhere
declare global {
    namespace Express {
        interface Request {
            user?: { id: string; username?: string };
        }
    }
}

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;

    if (!auth?.startsWith("Bearer ")) {
        return res.status(StatusCode.UNAUTHORIZED).send({ message: "Missing Bearer token" });
    }

    const token = auth.slice("Bearer ".length);
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        Logger.error("JWT_SECRET is not set");
        return res
            .status(StatusCode.INTERNAL_SERVER_ERROR)
            .send({ message: "Server auth misconfiguration" });
    }

    try {
        const payload = jwt.verify(token, secret) as JwtUserPayload;

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
