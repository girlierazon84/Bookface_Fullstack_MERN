// backend/src/services/mediaService.ts

import { destroyByPublicId, uploadBuffer } from "./cloudinary";
import type { IPostMedia, PostMediaType } from "../models/postModel";
import { isCloudinaryConfigured } from "../utils/env";


export type MediaType = PostMediaType; // "image" | "video"
export type UploadedMedia = IPostMedia;

/**------------------------------
    Error helpers (typed)
--------------------------------*/
export class MediaServiceError extends Error {
    public readonly status: number;
    public readonly code: "CLOUDINARY_NOT_CONFIGURED" | "UNSUPPORTED_MEDIA" | "UPLOAD_FAILED";

    constructor(
        message: string,
        status: number,
        code: MediaServiceError["code"]
    ) {
        super(message);
        this.name = "MediaServiceError";
        this.status = status;
        this.code = code;
    }
}

const isSupportedMime = (mime?: string) => {
    if (!mime) return false;
    return mime.startsWith("image/") || mime.startsWith("video/");
};

const inferType = (mime?: string): MediaType => (mime?.startsWith("video/") ? "video" : "image");

/**------------------------------------------------------------------------------------------
        - Uses resourceType "auto" to support both images + videos.
        - Throws MediaServiceError with status codes so controllers can respond properly.
---------------------------------------------------------------------------------------------*/
export const uploadSingle = async (file: Express.Multer.File, folder: string): Promise<UploadedMedia> => {
    if (!isCloudinaryConfigured()) {
        throw new MediaServiceError(
            "Media upload is not configured. Missing CLOUDINARY_* env vars.",
            503,
            "CLOUDINARY_NOT_CONFIGURED"
        );
    }

    if (!isSupportedMime(file.mimetype)) {
        throw new MediaServiceError(
            `Unsupported media type: "${file.mimetype || "unknown"}". Only images/videos are allowed.`,
            415,
            "UNSUPPORTED_MEDIA"
        );
    }

    const inferred = inferType(file.mimetype);

    try {
        const res = await uploadBuffer({
            buffer: file.buffer,
            folder,
            filename: file.originalname,
            resourceType: "auto",
            mimeType: file.mimetype
        });

        // Cloudinary tells us what it actually stored
        const type: MediaType = res.resource_type === "video" ? "video" : inferred;

        return {
            url: res.secure_url,
            publicId: res.public_id,
            type,
            mime: file.mimetype,
            width: res.width,
            height: res.height,
            duration: res.duration
        };
    } catch (err: any) {
        // wrap low-level errors with a clean service-level error
        const msg = String(err?.message ?? "Media upload failed");
        throw new MediaServiceError(msg, 502, "UPLOAD_FAILED");
    }
};

export const uploadMany = async (files: Express.Multer.File[], folder: string): Promise<UploadedMedia[]> => {
    if (!files.length) return [];
    // parallel upload; if you want partial success later, we can change this to allSettled
    return Promise.all(files.map((f) => uploadSingle(f, folder)));
};

/**-----------------------------------------------------------------------
    Replace media: best effort delete old, then upload new.
    If Cloudinary isn't configured, uploadSingle throws 503 (correct).
--------------------------------------------------------------------------*/
export const replaceMedia = async (args: {
    previousPublicId?: string;
    previousType?: MediaType; // optional: faster delete
    file: Express.Multer.File;
    folder: string;
}) => {
    if (args.previousPublicId) {
        // destroyByPublicId already best-effort guards missing cloudinary
        await destroyByPublicId(args.previousPublicId, args.previousType);
    }
    return uploadSingle(args.file, args.folder);
};
