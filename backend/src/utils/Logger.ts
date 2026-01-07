import winston from "winston";
import fs from "fs";
import path from "path";


const levels = {
    error: 0,
    warn: 1,
    info: 2,
    http: 3,
    debug: 4
};

const getLevel = () => {
    const env = process.env.NODE_ENV ?? "development";
    return env === "development" ? "debug" : "warn";
};

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "white"
};

winston.addColors(colors);

// Ensure logs directory exists
const logsDir = path.join(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) {
    fs.mkdirSync(logsDir, { recursive: true });
}

const format = winston.format.combine(
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss.SSS" }),
    winston.format.errors({ stack: true }),
    winston.format.splat(),
    winston.format.colorize({ all: true }),
    winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
        const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : "";
        const stackString = stack ? `\n${stack}` : "";
        return `${timestamp} ${level}: ${message}${metaString}${stackString}`;
    })
);

const transports: winston.transport[] = [
    new winston.transports.Console(),
    new winston.transports.File({
        filename: path.join(logsDir, "error.log"),
        level: "error"
    }),
    new winston.transports.File({
        filename: path.join(logsDir, "all.log")
    })
];

const Logger = winston.createLogger({
    level: getLevel(),
    levels,
    format,
    transports
});

export default Logger;
