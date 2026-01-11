// backend/src/server.ts

import "dotenv/config";
import express from "express";
import applyMiddleware from "./middlewares/applyMiddleware";
import configuration from "./config/configuration";
import { notFound, errorHandler } from "./middlewares/errorMiddleware";
import logger from "./utils/logger";


// routers
import postRouter from "./routes/postRoutes";
// import authRouter from "./routes/authRoutes" ... (convert similarly)
// import userRouter from "./routes/userRoutes" ...
// etc.

const app = express();
applyMiddleware(app);

// Mount API
app.use("/api/posts", postRouter);

// TODO: convert the rest to Router style and mount:
// app.use("/api/auth", authRouter);
// app.use("/api/users", userRouter);
// app.use("/api/feed", feedRouter);
// app.use("/api/comments", commentRouter);
// app.use("/api/friends", friendRouter);

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
