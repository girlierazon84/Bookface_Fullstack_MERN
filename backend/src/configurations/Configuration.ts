import type { Express } from "express";
import { connect } from "mongoose";
import Logger from "../utils/logger"; // <-- keep this consistent everywhere (see note below)


const getRequiredEnv = (key: string): string => {
    const value = process.env[key];
    if (!value) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
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

const mongodbUrl = getRequiredEnv("MONGODB_URL");
const dbName = getRequiredEnv("MONGODB_DB_NAME");

const connectToDatabase = async () => {
    const uri = `${mongodbUrl}${dbName}`;

    try {
        await connect(uri);
        Logger.info("Successfully connected to the Database");
    } catch (error) {
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

export default {
    connectToPort,
    connectToDatabase
};
