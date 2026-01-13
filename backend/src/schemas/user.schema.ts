// backend/src/schemas/user.schema.ts

import { z } from "zod";
import { objectIdSchema } from "./common.schema";


/**-----------
    Params
--------------*/
export const userIdParamsSchema = z.object({
    userId: objectIdSchema
});

/**----------
    Query
-------------*/
export const searchUsersSchema = z.object({
    username: z.coerce.string().trim().min(1).max(40)
});

/**--------------------------
    Body: PATCH /users/me
-----------------------------*/
export const updateMeSchema = z
    .object({
        firstname: z.string().trim().min(1).max(60).optional(),
        lastname: z.string().trim().min(1).max(60).optional(),
        bio: z.string().trim().max(280).optional()
    })
    .refine((v) => Object.keys(v).length > 0, { message: "No fields to update" });

/**-----------------------------------------------------------------------------------
    (Optional) If you later add PATCH /users/me/media to support url removal, etc.
    Keep this here for future growth, but not used right now.
--------------------------------------------------------------------------------------*/
export const updateMyMediaSchema = z
    .object({
        avatarUrl: z.string().url().optional(),
        coverUrl: z.string().url().optional()
    })
    .refine((v) => Object.keys(v).length > 0, { message: "No fields to update" });
