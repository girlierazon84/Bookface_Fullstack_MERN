// backend/src/schemas/post.schema.ts

import { z } from "zod";


export const createPostBodySchema = z.object({
    content: z.string().trim().max(5000).optional().default("")
});

export const updatePostBodySchema = z.object({
    content: z.string().trim().max(5000)
});
