// backend/src/schemas/media.schema.ts

import { z } from "zod";
import { objectIdSchema } from "./common.schema";


export const postIdParamsSchema = z.object({
    postId: objectIdSchema
});

export const deleteMediaParamsSchema = z.object({
    postId: objectIdSchema,
    publicId: z.string().trim().min(1, { message: "publicId is required" })
});
