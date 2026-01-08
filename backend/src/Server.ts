// backend/src/Server.ts

import "dotenv/config";
import express from "express";

import ApplyMiddlewares from "./configurations/ApplyMiddlewares";
import Configuration from "./configurations/Configuration";

import AliveRoutes from "./routes/AliveRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import FeedRoutes from "./routes/FeedRoutes";
import UserRoutes from "./routes/UserRoutes";
import PostRoutes from "./routes/PostRoutes";
import CommentRoutes from "./routes/CommentRoutes";
import FriendRoutes from "./routes/FriendRoutes";

import { notFound } from "./middlewares/ErrorMiddleware";


const app = express();

ApplyMiddlewares(app);

// Routes
AliveRoutes.routes(app);
AuthRoutes.routes(app);
FeedRoutes.routes(app);
UserRoutes.routes(app);
PostRoutes.routes(app);
CommentRoutes.routes(app);
FriendRoutes.routes(app);

// 404 handler (must be after routes)
app.use(notFound);

// Start server only after DB is connected
(async () => {
    await Configuration.connectToDatabase();
    Configuration.connectToPort(app);
})();

export default app;
