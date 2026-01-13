// backend/src/schemas/auth.schema.ts

import { z } from "zod";


/**-------------------
    Shared helpers
----------------------*/
const nameSchema = z
    .string()
    .trim()
    .min(1, "Required")
    .max(60, "Too long");

const emailSchema = z
    .string()
    .trim()
    .email("Invalid email")
    .max(320, "Too long")
    .transform((v) => v.toLowerCase());

/**------------------------------------------------
    Username rules:
        - 3..40 chars
        - letters/numbers + . _ -
        - must start and end with alphanumeric
---------------------------------------------------*/
const usernameSchema = z
    .string()
    .trim()
    .min(3, "Username must be at least 3 characters")
    .max(40, "Username must be at most 40 characters")
    .regex(/^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?$/, "Invalid username format");

const passwordSchema = z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(128, "Password must be at most 128 characters")
    .refine((v) => v.trim() === v, "Password cannot start or end with spaces");

/**------------
    Schemas
---------------*/
export const registerSchema = z.object({
    firstname: nameSchema,
    lastname: nameSchema,
    email: emailSchema,
    username: usernameSchema,
    password: passwordSchema
});

/**--------------------------------------------------------------------------
    Login supports username OR email
        - We normalize to a trimmed string always
        - If it's an email-like identifier, we lowercase it for matching
-----------------------------------------------------------------------------*/
export const loginSchema = z.object({
    username: z
        .string()
        .trim()
        .min(1, "Username or email is required")
        .max(320, "Too long")
        .transform((v) => {
            const looksLikeEmail = v.includes("@");
            return looksLikeEmail ? v.toLowerCase() : v;
        }),
    password: z.string().min(1, "Password is required").max(128, "Too long")
});
