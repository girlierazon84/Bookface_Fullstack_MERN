import bcrypt from "bcrypt";
import Logger from "./logger";


const saltRounds = 10;

const createPassword = async (plaintextPassword: string): Promise<string> => {
    try {
        return await bcrypt.hash(plaintextPassword, saltRounds);
    } catch (error) {
        Logger.error("Failed to hash password", error);
        throw error;
    }
};

const comparePassword = async (
    plaintextPassword: string,
    hashedPassword: string
): Promise<boolean> => {
    try {
        return await bcrypt.compare(plaintextPassword, hashedPassword);
    } catch (error) {
        Logger.error("Failed to compare password", error);
        throw error;
    }
};

export default {
    createPassword,
    comparePassword
};
