// backend/src/config/configuration.ts

import type { Express } from "express";
import mongoose from "mongoose";
import logger from "../utils/logger";


const getRequiredEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) throw new Error(`Missing required environment variable: ${key}`);
    return value;
};

const getPort = (key: string, fallback: number): number => {
    const raw = process.env[key];
    if (!raw) return fallback;

    const port = Number(raw);
    if (!Number.isInteger(port) || port < 0 || port > 65535) {
        throw new Error(`Invalid ${key} value: "${raw}"`);
    }
    return port;
};

const port = getPort("SERVER_PORT", 3001);
const env = process.env.NODE_ENV ?? "development";

/**------------------------------------------------------------------------------
    Prefer using ONE env var for the full mongo connection string:
    MONGO_URI=mongodb://127.0.0.1:27017/bookface-mern
    If you also keep DB_NAME, we only append it if MONGO_URI has no db path.
---------------------------------------------------------------------------------*/
const buildMongoUri = (): string => {
    const mongoUri = getRequiredEnv("MONGO_URI").trim();
    const dbName = (process.env.DB_NAME ?? "").trim();

    // If uri already includes a db name path (mongodb://host:port/mydb)
    const hasDbPath = /mongodb(\+srv)?:\/\/[^/]+\/[^?]+/i.test(mongoUri);

    if (hasDbPath) return mongoUri;

    if (!dbName) return mongoUri; // allow connecting without selecting db explicitly

    if (dbName.includes("/") || dbName.includes("\\")) {
        throw new Error(`Invalid DB_NAME "${dbName}". Do not include "/" or "\\".`);
    }

    return mongoUri.endsWith("/") ? `${mongoUri}${dbName}` : `${mongoUri}/${dbName}`;
};

const connectToDatabase = async () => {
    mongoose.set("strictQuery", false);

    const mongodbUri = buildMongoUri();

    let attempt = 0;
    // retry forever in dev/watch so tsx doesn't restart-loop
    while (true) {
        attempt += 1;
        try {
            await mongoose.connect(mongodbUri, {
                serverSelectionTimeoutMS: 5000
            });
            logger.info("✅ Connected to MongoDB");
            return;
        } catch (error) {
            logger.error(`❌ MongoDB connect failed (attempt ${attempt})`, error);
            await new Promise((r) => setTimeout(r, 2000));
        }
    }
};

const connectToPort = (app: Express) => {
    app.listen(port, () => {
        logger.info(`Server started at http://localhost:${port}`);
        if (env === "development") logger.warn("SERVER RUNNING IN DEVELOPMENT MODE!");
    });
};

export default { connectToPort, connectToDatabase };
