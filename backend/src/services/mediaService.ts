// backend/src/services/mediaService.ts

import type { Express } from "express";
import { destroyByPublicId, uploadBuffer } from "./cloudinary";
import type { IPostMedia, PostMediaType } from "../models/postModel";


export type MediaType = PostMediaType; // "image" | "video"
export type UploadedMedia = IPostMedia;

const inferType = (mime?: string): MediaType => (mime?.startsWith("video/") ? "video" : "image");

export const uploadSingle = async (file: Express.Multer.File, folder: string): Promise<UploadedMedia> => {
    const type = inferType(file.mimetype);

    const res = await uploadBuffer({
        buffer: file.buffer,
        folder,
        filename: file.originalname,
        resourceType: type
    });

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
    previousType?: MediaType; // optional but avoids extra Cloudinary attempts
    file: Express.Multer.File;
    folder: string;
}) => {
    if (args.previousPublicId) await destroyByPublicId(args.previousPublicId, args.previousType);
    return uploadSingle(args.file, args.folder);
};
