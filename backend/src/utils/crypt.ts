// backend/src/utils/crypt.ts

import bcrypt from "bcrypt";
import Logger from "./Logger";


const saltRounds = 10;

export const hashPassword = async (plaintext: string): Promise<string> => {
    try {
        return await bcrypt.hash(plaintext, saltRounds);
    } catch (err) {
        Logger.error("Failed to hash password", err);
        throw err;
    }
};

export const comparePassword = async (plaintext: string, hash: string): Promise<boolean> => {
    try {
        return await bcrypt.compare(plaintext, hash);
    } catch (err) {
        Logger.error("Failed to compare password", err);
        throw err;
    }
};
