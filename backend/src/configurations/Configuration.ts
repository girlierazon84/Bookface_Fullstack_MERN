import type { Express } from "express";
import { connect } from "mongoose";
import Logger from "../utils/Logger";


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

const port = getPort("SERVER_PORT", 4000);
const env = process.env.NODE_ENV ?? "development";

const mongoUri = getRequiredEnv("MONGO_URI");
const dbName = getRequiredEnv("DB_NAME");

// Ensure we don't end up with missing or double slashes
const mongodbUri = mongoUri.endsWith("/") ? `${mongoUri}${dbName}` : `${mongoUri}/${dbName}`;

const connectToDatabase = async () => {
    try {
        await connect(mongodbUri);
        Logger.info("Successfully connected to the Database");
    } catch (error: unknown) {
        Logger.error("ERROR WHILE CONNECTING TO DATABASE", error);
        process.exit(1);
    }
};

const connectToPort = (app: Express) => {
    app.listen(port, () => {
        Logger.info(`Server started at http://localhost:${port}`);
        if (env === "development") {
            Logger.warn("SERVER RUNNING IN DEVELOPMENT MODE!");
        }
    });
};

export default { connectToPort, connectToDatabase };
