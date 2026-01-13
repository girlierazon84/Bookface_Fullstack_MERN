// backend/src/services/mediaService.ts

import { destroyByPublicId, uploadBuffer } from "./cloudinary";
import type { IPostMedia, PostMediaType } from "../models/postModel";
import { isCloudinaryConfigured } from "../utils/env";


export type MediaType = PostMediaType; // "image" | "video"
export type UploadedMedia = IPostMedia;

export class MediaServiceError extends Error {
    status: number;
    code: string;

    constructor(message: string, args: { status: number; code: string }) {
        super(message);
        this.name = "MediaServiceError";
        this.status = args.status;
        this.code = args.code;
    }
}

const inferType = (mime?: string): MediaType => (mime?.startsWith("video/") ? "video" : "image");

const assertCloudinaryConfigured = () => {
    if (!isCloudinaryConfigured()) {
        throw new MediaServiceError(
            "Media upload is not configured. Set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET.",
            { status: 503, code: "CLOUDINARY_NOT_CONFIGURED" }
        );
    }
};

const assertValidFile = (file: Express.Multer.File) => {
    // Multer memoryStorage should always provide buffer, but guarding helps avoid mysterious errors.
    if (!file?.buffer || file.buffer.length === 0) {
        throw new MediaServiceError("Upload failed: empty file buffer.", { status: 400, code: "EMPTY_FILE" });
    }
    if (!file.mimetype) {
        throw new MediaServiceError("Upload failed: missing file mimetype.", { status: 400, code: "MISSING_MIMETYPE" });
    }
};

/**--------------------------------------------------------------
    Upload a single file to Cloudinary.
    Posts: resourceType "auto" supports both images + videos.
-----------------------------------------------------------------*/
export const uploadSingle = async (file: Express.Multer.File, folder: string): Promise<UploadedMedia> => {
    assertCloudinaryConfigured();
    assertValidFile(file);

    const inferred = inferType(file.mimetype);

    const res = await uploadBuffer({
        buffer: file.buffer,
        folder,
        filename: file.originalname || "upload",
        resourceType: "auto",
        mimeType: file.mimetype
    });

    // Cloudinary tells us what it actually stored:
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
};

export const uploadMany = async (files: Express.Multer.File[], folder: string): Promise<UploadedMedia[]> => {
    assertCloudinaryConfigured();

    if (!Array.isArray(files) || files.length === 0) return [];
    return Promise.all(files.map((f) => uploadSingle(f, folder)));
};

export const replaceMedia = async (args: {
    previousPublicId?: string;
    previousType?: MediaType;
    file: Express.Multer.File;
    folder: string;
}): Promise<UploadedMedia> => {
    assertCloudinaryConfigured();
    assertValidFile(args.file);

    if (args.previousPublicId) {
        // best-effort delete (destroyByPublicId already handles missing config / failures safely)
        await destroyByPublicId(args.previousPublicId, args.previousType);
    }

    return uploadSingle(args.file, args.folder);
};
