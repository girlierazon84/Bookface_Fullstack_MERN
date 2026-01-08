// backend/src/middlewares/AuthMiddleware.ts

import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import StatusCode from "../configurations/StatusCode";


type JwtUserPayload = { id: string; username?: string };

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const auth = req.headers.authorization;

    if (!auth?.startsWith("Bearer ")) {
        return res.status(StatusCode.UNAUTHORIZED).send({ message: "Missing Bearer token" });
    }

    const token = auth.slice("Bearer ".length);
    const secret = process.env.JWT_SECRET;

    if (!secret) {
        return res.status(StatusCode.INTERNAL_SERVER_ERROR).send({ message: "JWT_SECRET is not set" });
    }

    try {
        const payload = jwt.verify(token, secret) as JwtUserPayload;
        req.user = { id: payload.id, username: payload.username };
        next();
    } catch {
        return res.status(StatusCode.UNAUTHORIZED).send({ message: "Invalid/expired token" });
    }
};
