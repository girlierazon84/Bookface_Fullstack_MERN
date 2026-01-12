// backend/src/services/mediaService.ts

import type { Express } from "express";
import { destroyByPublicId, uploadBuffer } from "./cloudinary";
import type { IPostMedia, PostMediaType } from "../models/postModel";


export type MediaType = PostMediaType; // "image" | "video"
export type UploadedMedia = IPostMedia;

const inferType = (mime?: string): MediaType => (mime?.startsWith("video/") ? "video" : "image");

/**---------------------------------------------------------------------------------------------------------------------
    Upload a single file to Cloudinary.
    For posts, we upload with resourceType "auto" to support both images + videos.
    For avatars/covers, you can still call uploadBuffer with resourceType "image" directly (via controller/service).
------------------------------------------------------------------------------------------------------------------------*/
export const uploadSingle = async (file: Express.Multer.File, folder: string): Promise<UploadedMedia> => {
    const inferred = inferType(file.mimetype);

    const res = await uploadBuffer({
        buffer: file.buffer,
        folder,
        filename: file.originalname,
        resourceType: "auto", // ✅ supports both image + video reliably
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
    return Promise.all(files.map((f) => uploadSingle(f, folder)));
};

export const replaceMedia = async (args: {
    previousPublicId?: string;
    previousType?: MediaType; // optional: faster delete
    file: Express.Multer.File;
    folder: string;
}) => {
    if (args.previousPublicId) await destroyByPublicId(args.previousPublicId, args.previousType);
    return uploadSingle(args.file, args.folder);
};
