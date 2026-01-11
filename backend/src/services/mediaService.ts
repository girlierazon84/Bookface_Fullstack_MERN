// backend/src/services/mediaService.ts

import type { Express } from "express";
import {
    destroyByPublicId,
    uploadBuffer
} from "./cloudinary";


export type MediaType = "image" | "video";

export type UploadedMedia = {
    url: string;
    publicId: string;
    type: MediaType;
    mime?: string;
    width?: number;
    height?: number;
    duration?: number;
};

const inferType = (resourceType: string, mime?: string): MediaType => {
    if (resourceType === "video") return "video";
    if (mime?.startsWith("video/")) return "video";
    return "image";
};

export const uploadSingle = async (file: Express.Multer.File, folder: string): Promise<UploadedMedia> => {
    const res = await uploadBuffer({
        buffer: file.buffer,
        folder,
        filename: file.originalname,
        mimeType: file.mimetype
    });

    return {
        url: res.secure_url,
        publicId: res.public_id,
        type: inferType(res.resource_type, file.mimetype),
        mime: file.mimetype,
        width: res.width,
        height: res.height,
        duration: res.duration
    };
};

export const uploadMany = async (files: Express.Multer.File[], folder: string): Promise<UploadedMedia[]> => {
    const uploads = await Promise.all(files.map((f) => uploadSingle(f, folder)));
    return uploads;
};

export const replaceMedia = async (args: {
    previousPublicId?: string;
    file: Express.Multer.File;
    folder: string;
}) => {
    if (args.previousPublicId) await destroyByPublicId(args.previousPublicId);
    return uploadSingle(args.file, args.folder);
};
