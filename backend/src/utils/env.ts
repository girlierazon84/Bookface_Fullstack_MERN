// backend/src/utils/env.ts

export const getEnv = (key: string) => (process.env[key] ?? "").trim();

const stripWrappingQuotes = (value: string) => value.replace(/^["']|["']$/g, "");

export const getRequiredEnv = (key: string) => {
    const raw = stripWrappingQuotes(getEnv(key));
    if (!raw) throw new Error(`Missing required environment variable: ${key}`);
    return raw;
};

/**----------------------------------------------------------------
    Builds a valid Mongo URI.
    Supports:
        - MONGO_URI or MONGODB_URI
        - optional DB_NAME appended only if URI has no db path
-------------------------------------------------------------------*/
export const getMongoUri = () => {
    const raw = stripWrappingQuotes(getEnv("MONGO_URI") || getEnv("MONGODB_URI"));
    if (!raw) throw new Error("Missing required environment variable: MONGO_URI (or MONGODB_URI)");

    if (!raw.startsWith("mongodb://") && !raw.startsWith("mongodb+srv://")) {
        throw new Error(
            `Invalid MONGO_URI scheme. Must start with "mongodb://" or "mongodb+srv://". Got: ${raw.slice(0, 40)}...`
        );
    }

    const dbName = stripWrappingQuotes(getEnv("DB_NAME"));
    const hasDbPath = /mongodb(\+srv)?:\/\/[^/]+\/[^?]+/i.test(raw);
    if (hasDbPath || !dbName) return raw;

    if (dbName.includes("/") || dbName.includes("\\")) {
        throw new Error(`Invalid DB_NAME "${dbName}". Do not include "/" or "\\".`);
    }

    // preserve query string if any
    const [base, query] = raw.split("?");
    const joined = base.endsWith("/") ? `${base}${dbName}` : `${base}/${dbName}`;
    return query ? `${joined}?${query}` : joined;
};

export const isCloudinaryConfigured = () => {
    const name = getEnv("CLOUDINARY_CLOUD_NAME");
    const key = getEnv("CLOUDINARY_API_KEY");
    const secret = getEnv("CLOUDINARY_API_SECRET");
    return Boolean(name && key && secret);
};
