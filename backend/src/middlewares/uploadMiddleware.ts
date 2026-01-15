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

// avatars/covers: image only
const isImage = (mime: string) => mime.startsWith("image/");
// posts: allow both image + video
const isPostAllowed = (mime: string) => mime.startsWith("image/") || mime.startsWith("video/");

const avatarFilter: multer.Options["fileFilter"] = (
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    if (!isImage(file.mimetype)) return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "avatar"));
    cb(null, true);
};

const coverFilter: multer.Options["fileFilter"] = (
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
    if (!isImage(file.mimetype)) return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", "cover"));
    cb(null, true);
};

const postFilter: multer.Options["fileFilter"] = (
    _req: Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
) => {
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

const makeMulterErrorMessage = (err: multer.MulterError) => {
    switch (err.code) {
        case "LIMIT_FILE_SIZE": {
            if (err.field === "avatar") return `Avatar is too large (max ${MAX_AVATAR_MB}MB)`;
            if (err.field === "cover") return `Cover is too large (max ${MAX_COVER_MB}MB)`;
            if (err.field === "media") return `Media file is too large (max ${MAX_POST_FILE_MB}MB per file)`;
            return "File is too large";
        }
        case "LIMIT_FILE_COUNT":
            return `Too many files (max ${MAX_POST_FILES})`;
        case "LIMIT_UNEXPECTED_FILE": {
            if (err.field === "media") return "Only image/* and video/* files are allowed for posts";
            return "Only image/* files are allowed";
        }
        case "LIMIT_PART_COUNT":
        case "LIMIT_FIELD_COUNT":
        case "LIMIT_FIELD_KEY":
        case "LIMIT_FIELD_VALUE":
            return "Upload payload is too large or malformed";
        default:
            return err.message || "Upload failed";
    }
};

/**---------------------------------
    Central upload error handler
    Use AFTER multer middleware.
------------------------------------*/
export const multerErrorHandler = (err: unknown, _req: Request, res: Response, next: NextFunction) => {
    if (!err) return next();

    if (err instanceof multer.MulterError) {
        return res.status(statusCode.BAD_REQUEST).send({
            message: makeMulterErrorMessage(err),
            code: err.code,
            field: err.field,
            limits: {
                avatarMB: MAX_AVATAR_MB,
                coverMB: MAX_COVER_MB,
                postFileMB: MAX_POST_FILE_MB,
                postMaxFiles: MAX_POST_FILES
            }
        });
    }

    const msg = err instanceof Error ? err.message : "Upload failed";
    return res.status(statusCode.BAD_REQUEST).send({ message: msg });
};
