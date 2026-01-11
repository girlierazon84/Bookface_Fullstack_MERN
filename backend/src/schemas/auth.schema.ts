// backend/src/schemas/auth.schema.ts

import { z } from "zod";


export const registerSchema = z.object({
    firstname: z.string().trim().min(1).max(60),
    lastname: z.string().trim().min(1).max(60),
    email: z.string().trim().email().max(320),
    username: z.string().trim().min(1).max(40),
    password: z.string().min(6).max(200)
});

export const loginSchema = z.object({
    username: z.string().trim().min(1),
    password: z.string().min(1)
});
