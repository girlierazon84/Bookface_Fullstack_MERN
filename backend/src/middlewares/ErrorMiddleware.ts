import type { NextFunction, Request, Response } from "express";
import StatusCode from "../configurations/StatusCode";


const env = process.env.NODE_ENV ?? "development";

// 404 handler
const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(StatusCode.NOT_FOUND);
    next(new Error(`Not Found: ${req.originalUrl}`));
};

// Central error handler
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (error: unknown, req: Request, res: Response, next: NextFunction) => {
    const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;

    const message =
        error instanceof Error ? error.message : "An unexpected error occurred";

    const stack =
        error instanceof Error ? error.stack : undefined;

    res.status(statusCode).json({
        statusCode,
        message,
        stackTrace: env === "development" ? stack : undefined
    });
};

export { notFound, errorHandler };
