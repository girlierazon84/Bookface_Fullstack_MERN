// backend/src/schemas/post.schema.ts

import { z } from "zod";
import { objectIdSchema } from "./common.schema";


export const createPostBodySchema = z.object({
    content: z.coerce.string().trim().max(5000).optional().default("")
});

export const updatePostBodySchema = z
    .object({
        content: z.coerce.string().trim().min(1).max(5000).optional()
    })
    .refine((v) => Object.keys(v).length > 0, "No fields to update");

export const postIdSchema = z.object({
    postId: objectIdSchema
});
