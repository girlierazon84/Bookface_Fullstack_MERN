// backend/src/configurations/Configuration.ts

import type { Express } from "express";
import mongoose from "mongoose";
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

const normalizeMongoUri = (uri: string) => uri.trim().replace(/\/+$/g, "");
const normalizeDbName = (name: string) => name.trim().replace(/^\/+|\/+$/g, "");

const mongoUriRaw = getRequiredEnv("MONGO_URI");
const mongoUri = normalizeMongoUri(mongoUriRaw);

const dbNameRaw = process.env.DB_NAME; // optional if MONGO_URI already includes db
const dbName = dbNameRaw ? normalizeDbName(dbNameRaw) : "";

const uriAlreadyHasDb =
    /mongodb(\+srv)?:\/\/[^/]+\/[^?]+/.test(mongoUri); // has a path segment after host

const mongodbUri = uriAlreadyHasDb
    ? mongoUri
    : dbName
        ? `${mongoUri}/${dbName}`
        : mongoUri; // fallback => connects to default db if you didn't pass DB_NAME

const port = getPort("SERVER_PORT", 4000);
const env = process.env.NODE_ENV ?? "development";

const connectToDatabase = async () => {
    try {
        // optional: silence strictQuery deprecation warning
        mongoose.set("strictQuery", false);

        await mongoose.connect(mongodbUri);
        Logger.info(`Successfully connected to MongoDB: ${mongodbUri}`);
    } catch (error: unknown) {
        Logger.error("ERROR WHILE CONNECTING TO DATABASE", error);
        process.exit(1);
    }
};

const connectToPort = (app: Express) => {
    app.listen(port, () => {
        Logger.info(`Server started at http://localhost:${port}`);
        if (env === "development") Logger.warn("SERVER RUNNING IN DEVELOPMENT MODE!");
    });
};

export default { connectToPort, connectToDatabase };
