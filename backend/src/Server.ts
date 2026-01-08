// backend/src/Server.ts

import "dotenv/config";
import express from "express";
import ApplyMiddlewares from "./configurations/ApplyMiddlewares";
import Configuration from "./configurations/Configuration";
import AliveRoutes from "./routes/AliveRoutes";
import UserRoutes from "./routes/UserRoutes";
import PostRoutes from "./routes/PostRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import FeedRoutes from "./routes/FeedRoutes";
import CommentRoutes from "./routes/CommentRoutes";
import FriendRoutes from "./routes/FriendRoutes";

const app = express();

ApplyMiddlewares(app);

AliveRoutes.routes(app);
AuthRoutes.routes(app);
FeedRoutes.routes(app);
UserRoutes.routes(app);
PostRoutes.routes(app);
CommentRoutes.routes(app);
FriendRoutes.routes(app);

Configuration.connectToPort(app);
Configuration.connectToDatabase().then();

export default app;
