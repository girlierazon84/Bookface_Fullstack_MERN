// backend/src/server.ts

import "dotenv/config";
import express from "express";
import applyMiddleware from "./middlewares/applyMiddleware";
import configuration from "./config/configuration";
import routes from "./routes";
import {
    notFound,
    errorHandler
} from "./middlewares/errorMiddleware";
import logger from "./utils/logger";


const app = express();

// Middleware
applyMiddleware(app);

// Routes
app.use(routes);

// 404 + error handler (must be last)
app.use(notFound);
app.use(errorHandler);

const start = async () => {
    try {
        await configuration.connectToDatabase();
        configuration.connectToPort(app);
    } catch (err) {
        logger.error("Server startup failed", err);
        process.exit(1);
    }
};

void start();

export default app;
