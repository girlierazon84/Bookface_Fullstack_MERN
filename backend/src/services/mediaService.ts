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

/**------------------------------------------------------------------
    Upload a single file to Cloudinary.
    Posts: use resourceType "auto" (supports both image + video)
---------------------------------------------------------------------*/
export const uploadSingle = async (file: Express.Multer.File, folder: string): Promise<UploadedMedia> => {
    if (!isCloudinaryConfigured()) {
        throw new MediaServiceError(
            "Media upload is not configured. Set CLOUDINARY_CLOUD_NAME/API_KEY/API_SECRET.",
            { status: 503, code: "CLOUDINARY_NOT_CONFIGURED" }
        );
    }

    const inferred = inferType(file.mimetype);

    const res = await uploadBuffer({
        buffer: file.buffer,
        folder,
        filename: file.originalname,
        resourceType: "auto",
        mimeType: file.mimetype
    });

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
    return Promise.all(files.map((f) => uploadSingle(f, folder)));
};

export const replaceMedia = async (args: {
    previousPublicId?: string;
    previousType?: MediaType;
    file: Express.Multer.File;
    folder: string;
}): Promise<UploadedMedia> => {
    if (args.previousPublicId) {
        await destroyByPublicId(args.previousPublicId, args.previousType);
    }
    return uploadSingle(args.file, args.folder);
};
