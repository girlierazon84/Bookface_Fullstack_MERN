// backend/src/config/configuration.ts

import type { Express } from "express";
import mongoose from "mongoose";
import logger from "../utils/logger";
import { getEnv, getMongoUri } from "../utils/env";


const getPort = (key: string, fallback: number): number => {
    const raw = getEnv(key);
    if (!raw) return fallback;

    const port = Number(raw);
    if (!Number.isInteger(port) || port < 0 || port > 65535) {
        throw new Error(`Invalid ${key} value: "${raw}"`);
    }
    return port;
};

const port = getPort("SERVER_PORT", 3001);
const env = getEnv("NODE_ENV") || "development";

const connectToDatabase = async () => {
    mongoose.set("strictQuery", false);

    // ✅ validate + build correct uri
    const mongodbUri = getMongoUri();

    let attempt = 0;
    const maxAttempts = env === "development" ? Infinity : 10;

    while (attempt < maxAttempts) {
        attempt += 1;
        try {
            await mongoose.connect(mongodbUri, { serverSelectionTimeoutMS: 5000 });
            logger.info("✅ Connected to MongoDB");
            return;
        } catch (error: any) {
            // ✅ do NOT retry on config/parse errors (they will never succeed)
            const msg = String(error?.message ?? "");
            const isConfigError =
                msg.includes("Invalid MONGO_URI scheme") ||
                msg.includes("Missing required environment variable") ||
                msg.includes("Invalid scheme");

            logger.error(`❌ MongoDB connect failed (attempt ${attempt})`, error);

            if (isConfigError) {
                throw error;
            }

            await new Promise((r) => setTimeout(r, 2000));
        }
    }

    throw new Error("MongoDB connect failed: exceeded max retry attempts");
};

const connectToPort = (app: Express) => {
    app.listen(port, () => {
        logger.info(`Server started at http://localhost:${port}`);
        if (env === "development") logger.warn("SERVER RUNNING IN DEVELOPMENT MODE!");
    });
};

export default { connectToPort, connectToDatabase };
