// backend/src/middlewares/authMiddleware.ts

import type {
    Request,
    Response,
    NextFunction
} from "express";
import jwt from "jsonwebtoken";
import statusCode from "../config/statusCode";
import logger from "../utils/logger";


type JwtPayload = {
    id: string;
    username?: string;
};

export const requireAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(statusCode.UNAUTHORIZED).send({ message: "Missing Authorization header" });
    }

    // support "Bearer <token>" and "bearer <token>"
    const [scheme, token] = authHeader.split(" ");

    if (!scheme || scheme.toLowerCase() !== "bearer" || !token) {
        return res.status(statusCode.UNAUTHORIZED).send({ message: "Missing Bearer token" });
    }

    const secret = process.env.JWT_SECRET;
    if (!secret) {
        logger.error("JWT_SECRET is not set");
        return res.status(statusCode.INTERNAL_SERVER_ERROR).send({
            message: "Server auth misconfiguration"
        });
    }

    try {
        const payload = jwt.verify(token.trim(), secret) as JwtPayload;

        if (!payload?.id) {
            return res.status(statusCode.UNAUTHORIZED).send({ message: "Invalid token payload" });
        }

        req.user = { id: payload.id, username: payload.username };
        return next();
    } catch (error: unknown) {
        logger.warn("Invalid/expired token", error);
        return res.status(statusCode.UNAUTHORIZED).send({ message: "Invalid/expired token" });
    }
};
