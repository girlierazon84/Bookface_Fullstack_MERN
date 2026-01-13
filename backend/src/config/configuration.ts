// backend/src/config/configuration.ts

import type { Express } from "express";
import mongoose from "mongoose";
import logger from "../utils/logger";
import { getEnv, getMongoUri } from "../utils/env";


const getPort = (key: string, fallback: number): number => {
    const raw = getEnv(key);
    if (!raw) return fallback;

    const parsedPort = Number(raw);
    if (!Number.isInteger(parsedPort) || parsedPort < 0 || parsedPort > 65535) {
        throw new Error(`Invalid ${key} value: "${raw}"`);
    }
    return parsedPort;
};

const serverPort = getPort("SERVER_PORT", 3001);
const env = getEnv("NODE_ENV") || "development";

const isMongoConfigError = (err: unknown) => {
    const msg = err instanceof Error ? err.message : String(err ?? "");
    return (
        msg.includes("Invalid MONGO_URI scheme") ||
        msg.includes("Missing required environment variable") ||
        msg.includes("Invalid scheme") ||
        msg.includes("MongoParseError")
    );
};

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

const connectToDatabase = async () => {
    mongoose.set("strictQuery", false);

    // ✅ validate + build correct uri (throws early if bad)
    const mongodbUri = getMongoUri();

    let attempt = 0;
    const maxAttempts = env === "development" ? Number.POSITIVE_INFINITY : 10;

    while (attempt < maxAttempts) {
        attempt += 1;
        try {
            await mongoose.connect(mongodbUri, { serverSelectionTimeoutMS: 5000 });
            logger.info("✅ Connected to MongoDB");
            return;
        } catch (error: unknown) {
            logger.error(`❌ MongoDB connect failed (attempt ${attempt})`, error);

            // ✅ do NOT retry on config/parse errors (won't ever succeed)
            if (isMongoConfigError(error)) throw error;

            await sleep(2000);
        }
    }

    throw new Error("MongoDB connect failed: exceeded max retry attempts");
};

const connectToPort = (app: Express) => {
    app.listen(serverPort, () => {
        logger.info(`Server started at http://localhost:${serverPort}`);
        if (env === "development") logger.warn("SERVER RUNNING IN DEVELOPMENT MODE!");
    });
};

export default { connectToPort, connectToDatabase };
