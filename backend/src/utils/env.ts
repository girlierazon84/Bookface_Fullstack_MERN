// backend/src/utils/env.ts

export const getEnv = (key: string) => (process.env[key] ?? "").trim();

export const getMongoUri = () => {
    const raw = getEnv("MONGO_URI") || getEnv("MONGODB_URI");

    // Strip wrapping quotes if present (common Windows/.env copy issue)
    const uri = raw.replace(/^["']|["']$/g, "");

    if (!uri) {
        throw new Error("Missing required environment variable: MONGO_URI (or MONGODB_URI)");
    }

    if (!uri.startsWith("mongodb://") && !uri.startsWith("mongodb+srv://")) {
        throw new Error(
            `Invalid MONGO_URI scheme. Must start with "mongodb://" or "mongodb+srv://". Got: ${uri.slice(0, 30)}...`
        );
    }

    return uri;
};
