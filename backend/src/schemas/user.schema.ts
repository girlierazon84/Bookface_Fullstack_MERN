// backend/src/schemas/user.schema.ts

import { z } from "zod";
import { objectIdSchema } from "./common.schema";


export const userIdParamsSchema = z.object({
    userId: objectIdSchema
});

export const searchUsersSchema = z.object({
    username: z.coerce.string().trim().min(1).max(40)
});

export const updateMeSchema = z
    .object({
        firstname: z.string().trim().min(1).max(60).optional(),
        lastname: z.string().trim().min(1).max(60).optional(),
        bio: z.string().trim().max(280).optional()
    })
    .refine((v) => Object.keys(v).length > 0, { message: "No fields to update" });
