// backend/src/middlewares/validateSchema.ts

import type { Request, Response, NextFunction } from "express";
import type { ZodSchema } from "zod";
import statusCode from "../config/statusCode";


type Targets = "body" | "params" | "query";

export const validateSchema =
    (schema: ZodSchema, target: Targets = "body") =>
        (req: Request, res: Response, next: NextFunction) => {
            const result = schema.safeParse(req[target]);

            if (!result.success) {
                return res.status(statusCode.BAD_REQUEST).json({
                    message: "Validation failed",
                    errors: result.error.flatten()
                });
            }

            // Replace input with parsed/normalized result
            (req as any)[target] = result.data;
            next();
        };

export default validateSchema