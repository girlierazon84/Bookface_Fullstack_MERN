// backend/src/schemas/common.schema.ts

import { z } from "zod";
import { Types } from "mongoose";


export const objectIdSchema = z
    .string()
    .refine((v) => Types.ObjectId.isValid(v), { message: "Invalid ObjectId" });

export const nonEmptyString = (min = 1, max = 5000) =>
    z.coerce
        .string()
        .trim()
        .min(min, { message: `Must be at least ${min} characters` })
        .max(max, { message: `Must be at most ${max} characters` });
