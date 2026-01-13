// backend/src/utils/env.ts

export const getEnv = (key: string) => process.env[key]?.trim() ?? "";

export const getRequiredEnv = (key: string) => {
    const v = getEnv(key);
    if (!v) throw new Error(`Missing required environment variable: ${key}`);
    return v;
};

/**-----------------------------------------------------
    ✅ support old + new key names without breaking
--------------------------------------------------------*/
export const getMongoUri = () => {
    const mongo = getEnv("MONGO_URI") || getEnv("MONGODB_URI");
    if (!mongo) {
        throw new Error("Missing required environment variable: MONGO_URI (or MONGODB_URI)");
    }
    return mongo;
};
