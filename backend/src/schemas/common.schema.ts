// backend/src/schemas/common.schema.ts

import { z } from "zod";
import { Types } from "mongoose";


export const objectIdSchema = z
    .string()
    .refine((v) => Types.ObjectId.isValid(v), "Invalid ObjectId");

export const nonEmptyString = (min = 1, max = 5000) =>
    z.string().trim().min(min).max(max);
