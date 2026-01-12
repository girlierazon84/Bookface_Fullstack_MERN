// backend/src/middlewares/applyMiddleware.ts

import cors from "cors";
import express from "express";
import helmet from "helmet";
import morganMiddleware from "./morganMiddleware";
import logger from "../utils/logger";


const allowedOrigins = (process.env.CORS_ORIGINS ?? "http://localhost:3000")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const allowedMethods: cors.CorsOptions["methods"] = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const corsOptions: cors.CorsOptions = {
    credentials: true,
    methods: allowedMethods,
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400, // cache preflight 24h

    origin(origin, callback) {
        // Allow requests without origin (curl/postman/server-to-server)
        if (!origin) return callback(null, true);

        const ok = allowedOrigins.includes(origin);
        if (ok) return callback(null, true);

        logger.warn("Blocked by CORS", { origin, allowedOrigins });
        return callback(new Error("Not allowed by CORS"));
    }
};

const applyMiddleware = (app: express.Application) => {
    app.use(
        helmet({
            // Useful when serving images/video or embedding resources
            crossOriginResourcePolicy: { policy: "cross-origin" }
        })
    );

    app.use(cors(corsOptions));
    app.options("*", cors(corsOptions)); // handle preflight everywhere

    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());

    app.use(morganMiddleware);
};

export default applyMiddleware;
