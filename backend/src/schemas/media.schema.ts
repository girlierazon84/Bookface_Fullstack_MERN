// backend/src/schemas/media.schema.ts

import { z } from "zod";
import { objectIdSchema } from "./common.schema";


export const postIdParamsSchema = z.object({
    postId: objectIdSchema
});

export const deleteMediaParamsSchema = z.object({
    postId: objectIdSchema,
    publicId: z.string().min(1)
});
