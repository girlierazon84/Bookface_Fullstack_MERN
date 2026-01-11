// backend/src/schemas/common.schema.ts

import { z } from "zod";


export const objectIdSchema = z
    .string()
    .regex(/^[0-9a-fA-F]{24}$/, "Invalid ObjectId");

export const paginationSchema = z.object({
    limit: z.coerce.number().int().min(1).max(50).optional(),
    cursor: z.string().datetime().optional() // ISO timestamp
});
