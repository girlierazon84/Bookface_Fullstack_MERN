// backend/src/middlewares/uploadMiddleware.ts

import multer from "multer";
import statusCode from "../config/statusCode";


const storage = multer.memoryStorage();

const MAX_AVATAR_MB = 5;
const MAX_COVER_MB = 8;
const MAX_POST_FILE_MB = 25; // per file
const MAX_POST_FILES = 4;

const isAllowed = (mime: string) => mime.startsWith("image/") || mime.startsWith("video/");

const fileFilter: multer.Options["fileFilter"] = (_req, file, cb) => {
    if (!isAllowed(file.mimetype)) return cb(new Error("Only image/video uploads are allowed"));
    cb(null, true);
};

export const uploadAvatar = multer({
    storage,
    fileFilter,
    limits: { fileSize: MAX_AVATAR_MB * 1024 * 1024 }
}).single("avatar");

export const uploadCover = multer({
    storage,
    fileFilter,
    limits: { fileSize: MAX_COVER_MB * 1024 * 1024 }
}).single("cover");

export const uploadPostMedia = multer({
    storage,
    fileFilter,
    limits: { fileSize: MAX_POST_FILE_MB * 1024 * 1024, files: MAX_POST_FILES }
}).array("media", MAX_POST_FILES);

// Optional: express error helper for multer errors
export const multerErrorHandler = (err: any, _req: any, res: any, next: any) => {
    if (!err) return next();

    const msg = err?.message || "Upload failed";
    return res.status(statusCode.BAD_REQUEST).send({ message: msg });
};
