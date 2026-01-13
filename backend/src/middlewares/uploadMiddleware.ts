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

// ✅ avatars/covers: image only
const isImage = (mime: string) => mime.startsWith("image/");
// ✅ posts: allow both
const isPostAllowed = (mime: string) => mime.startsWith("image/") || mime.startsWith("video/");

const avatarFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
    if (!isImage(file.mimetype)) return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "avatar"));
    cb(null, true);
};

const coverFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
    if (!isImage(file.mimetype)) return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "cover"));
    cb(null, true);
};

const postFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
    if (!isPostAllowed(file.mimetype)) return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "media"));
    cb(null, true);
};

/**-----------------------------------------------
    Multer instances
        - avatar field name: "avatar" (single)
        - cover field name:  "cover"  (single)
        - post media field:  "media"  (array)
--------------------------------------------------*/
export const uploadAvatar = multer({
    storage,
    fileFilter: avatarFilter,
    limits: { fileSize: mb(MAX_AVATAR_MB), files: 1 }
}).single("avatar");

export const uploadCover = multer({
    storage,
    fileFilter: coverFilter,
    limits: { fileSize: mb(MAX_COVER_MB), files: 1 }
}).single("cover");

export const uploadPostMedia = multer({
    storage,
    fileFilter: postFilter,
    limits: { fileSize: mb(MAX_POST_FILE_MB), files: MAX_POST_FILES }
}).array("media", MAX_POST_FILES);

/**---------------------------------
    Central upload error handler
    Use AFTER multer middleware.
------------------------------------*/
export const multerErrorHandler = (err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (!err) return next();

    if (err instanceof multer.MulterError) {
        const msg =
            err.code === "LIMIT_FILE_SIZE"
                ? "File is too large"
                : err.code === "LIMIT_FILE_COUNT"
                    ? `Too many files (max ${MAX_POST_FILES})`
                    : err.code === "LIMIT_UNEXPECTED_FILE"
                        ? err.field === "media"
                            ? "Only image/* and video/* files are allowed for posts"
                            : "Only image/* files are allowed"
                        : err.message;

        return res.status(statusCode.BAD_REQUEST).send({ message: msg });
    }

    const msg = err instanceof Error ? err.message : "Upload failed";
    return res.status(statusCode.BAD_REQUEST).send({ message: msg });
};
