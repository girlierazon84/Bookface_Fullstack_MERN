// backend/src/services/cloudinary.ts

import crypto from "crypto";
import logger from "../utils/logger";
import {
    getEnv,
    getRequiredEnv,
    isCloudinaryConfigured
} from "../utils/env";


export type ResourceType = "image" | "video" | "raw" | "auto";

export type UploadResult = {
    secure_url: string;
    public_id: string;
    resource_type: "image" | "video" | "raw";
    format?: string;
    bytes?: number;
    width?: number;
    height?: number;
    duration?: number;
};

const cloudName = () => getRequiredEnv("CLOUDINARY_CLOUD_NAME").trim();
const apiKey = () => getRequiredEnv("CLOUDINARY_API_KEY").trim();
const apiSecret = () => getRequiredEnv("CLOUDINARY_API_SECRET").trim();

const sha1 = (value: string) => crypto.createHash("sha1").update(value).digest("hex");

const signParams = (params: Record<string, string | number | boolean | undefined | null>) => {
    const filtered: Record<string, string> = {};

    for (const [k, v] of Object.entries(params)) {
        if (v === undefined || v === null) continue;
        if (k === "file" || k === "cloud_name" || k === "resource_type" || k === "api_key" || k === "signature") continue;
        filtered[k] = String(v);
    }

    const toSign = Object.keys(filtered)
        .sort()
        .map((k) => `${k}=${filtered[k]}`)
        .join("&");

    return sha1(`${toSign}${apiSecret()}`);
};

const uploadUrl = (resourceType: ResourceType) =>
    `https://api.cloudinary.com/v1_1/${cloudName()}/${resourceType}/upload`;

const destroyUrl = (resourceType: Exclude<ResourceType, "auto">) =>
    `https://api.cloudinary.com/v1_1/${cloudName()}/${resourceType}/destroy`;

export const uploadBuffer = async (opts: {
    buffer: Buffer;
    filename: string;
    folder: string;
    resourceType: ResourceType;
    mimeType?: string;
    publicId?: string;
    tags?: string[];
    overwrite?: boolean;
}) => {
    if (!isCloudinaryConfigured()) {
        throw new Error("Cloudinary is not configured. Missing CLOUDINARY_* env vars.");
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const params = {
        folder: opts.folder,
        public_id: opts.publicId,
        tags: opts.tags?.join(","),
        overwrite: opts.overwrite ?? true,
        timestamp
    };

    const signature = signParams(params);

    const bytes = Uint8Array.from(opts.buffer);
    const blob = new Blob([bytes], opts.mimeType ? { type: opts.mimeType } : undefined);

    const form = new FormData();
    form.append("file", blob, opts.filename);
    form.append("api_key", apiKey());
    form.append("timestamp", String(timestamp));
    form.append("signature", signature);

    if (params.folder) form.append("folder", params.folder);
    if (params.public_id) form.append("public_id", params.public_id);
    if (params.tags) form.append("tags", params.tags);
    form.append("overwrite", String(params.overwrite));

    const res = await fetch(uploadUrl(opts.resourceType), { method: "POST", body: form });
    const data = (await res.json()) as any;

    if (!res.ok) {
        logger.error("Cloudinary upload failed", { status: res.status, data });
        throw new Error(data?.error?.message ?? "Cloudinary upload failed");
    }

    return data as UploadResult;
};

export const destroyAsset = async (opts: {
    publicId: string;
    resourceType: Exclude<ResourceType, "auto">;
    invalidate?: boolean;
}) => {
    if (!isCloudinaryConfigured()) {
        // best effort: if not configured, do not crash delete flows
        return { result: "not found" as const };
    }

    const timestamp = Math.floor(Date.now() / 1000);

    const params = {
        public_id: opts.publicId,
        invalidate: opts.invalidate ?? true,
        timestamp
    };

    const signature = signParams(params);

    const form = new FormData();
    form.append("public_id", opts.publicId);
    form.append("invalidate", String(params.invalidate));
    form.append("timestamp", String(timestamp));
    form.append("api_key", apiKey());
    form.append("signature", signature);

    const res = await fetch(destroyUrl(opts.resourceType), { method: "POST", body: form });
    const data = (await res.json()) as any;

    if (!res.ok) {
        logger.error("Cloudinary destroy failed", { status: res.status, data });
        throw new Error(data?.error?.message ?? "Cloudinary destroy failed");
    }

    return data as { result: "ok" | "not found" | string };
};

export const destroyByPublicId = async (publicId: string, type?: "image" | "video") => {
    if (!publicId) return { result: "not found" as const };

    const tryDestroy = async (resourceType: "image" | "video") => {
        try {
            return await destroyAsset({ publicId, resourceType, invalidate: true });
        } catch (e) {
            logger.warn("Cloudinary destroy attempt failed", { publicId, resourceType, error: e });
            return { result: "not found" as const };
        }
    };

    if (type) return tryDestroy(type);

    const r1 = await tryDestroy("image");
    if (r1.result === "ok") return r1;

    return tryDestroy("video");
};
