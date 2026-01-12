// backend/src/middlewares/uploadMiddleware.ts

import type { NextFunction, Request, Response } from "express";
import multer from "multer";
import statusCode from "../config/statusCode";


const storage = multer.memoryStorage();

/**-----------
    Limits
--------------*/
const MAX_AVATAR_MB = 5;
const MAX_COVER_MB = 8;
const MAX_POST_FILE_MB = 25; // per file
const MAX_POST_FILES = 4;

const mb = (n: number) => n * 1024 * 1024;

const isAllowedMime = (mime: string) => mime.startsWith("image/") || mime.startsWith("video/");

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
    if (!isAllowedMime(file.mimetype)) {
        return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "file"));
    }
    cb(null, true);
};

/**----------------------------------------------
    Multer instances
        - avatar field name: "avatar"
        - cover field name:  "cover"
        - post media field:  "media" (array)
-------------------------------------------------*/
export const uploadAvatar = multer({
    storage,
    fileFilter,
    limits: { fileSize: mb(MAX_AVATAR_MB), files: 1 }
}).single("avatar");

export const uploadCover = multer({
    storage,
    fileFilter,
    limits: { fileSize: mb(MAX_COVER_MB), files: 1 }
}).single("cover");

export const uploadPostMedia = multer({
    storage,
    fileFilter,
    limits: { fileSize: mb(MAX_POST_FILE_MB), files: MAX_POST_FILES }
}).array("media", MAX_POST_FILES);

/**---------------------------------
    Central upload error handler
    Use AFTER multer middleware.
------------------------------------*/
export const multerErrorHandler = (err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (!err) return next();

    // Multer known errors
    if (err instanceof multer.MulterError) {
        const msg =
            err.code === "LIMIT_FILE_SIZE"
                ? "File is too large"
                : err.code === "LIMIT_FILE_COUNT"
                    ? `Too many files (max ${MAX_POST_FILES})`
                    : err.code === "LIMIT_UNEXPECTED_FILE"
                        ? "Only image/* and video/* files are allowed"
                        : err.message;

        return res.status(statusCode.BAD_REQUEST).send({ message: msg });
    }

    // Other errors
    const msg = err instanceof Error ? err.message : "Upload failed";
    return res.status(statusCode.BAD_REQUEST).send({ message: msg });
};
