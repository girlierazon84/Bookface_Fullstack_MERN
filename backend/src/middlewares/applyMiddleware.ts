// backend/src/middlewares/applyMiddleware.ts

import cors from "cors";
import express from "express";
import helmet from "helmet";
import morganMiddleware from "./morganMiddleware";


const allowedOrigins = (process.env.CORS_ORIGINS ?? "http://localhost:3000")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

const allowedMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
    methods: allowedMethods,
    credentials: true
};

const applyMiddleware = (app: express.Application) => {
    app.use(helmet());
    app.use(cors(options));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(morganMiddleware);
};

export default applyMiddleware;
