// backend/src/services/cloudinary.ts

import { v2 as cloudinary } from "cloudinary";


const required = (key: string) => {
    const v = process.env[key];
    if (!v) throw new Error(`Missing env var: ${key}`);
    return v;
};

cloudinary.config({
    cloud_name: required("CLOUDINARY_CLOUD_NAME"),
    api_key: required("CLOUDINARY_API_KEY"),
    api_secret: required("CLOUDINARY_API_SECRET")
});

export type CloudinaryUploadResult = {
    secure_url: string;
    public_id: string;
    resource_type: "image" | "video" | "raw" | string;
    bytes?: number;
    format?: string;
    width?: number;
    height?: number;
    duration?: number;
};

export const uploadBuffer = (args: {
    buffer: Buffer;
    folder: string;
    filename?: string;
    mimeType?: string;
}) =>
    new Promise<CloudinaryUploadResult>((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            {
                folder: args.folder,
                resource_type: "auto"
            },
            (err, result) => {
                if (err || !result) return reject(err ?? new Error("Cloudinary upload failed"));
                resolve(result as CloudinaryUploadResult);
            }
        );

        stream.end(args.buffer);
    });

export const destroyByPublicId = async (publicId: string) => {
    if (!publicId) return;
    // "auto" delete: try image + video (Cloudinary requires resource_type sometimes)
    await cloudinary.uploader.destroy(publicId, { resource_type: "image" }).catch(() => undefined);
    await cloudinary.uploader.destroy(publicId, { resource_type: "video" }).catch(() => undefined);
};
