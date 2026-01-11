// backend/src/schemas/post.schema.ts

import { z } from "zod";
import { objectIdSchema, nonEmptyString } from "./common.schema";


export const createPostBodySchema = z.object({
    content: nonEmptyString(1, 5000)
});

export const updatePostBodySchema = z
    .object({
        content: nonEmptyString(1, 5000).optional()
    })
    .refine((v) => Object.keys(v).length > 0, "No fields to update");

export const postIdSchema = z.object({
    postId: objectIdSchema
});
