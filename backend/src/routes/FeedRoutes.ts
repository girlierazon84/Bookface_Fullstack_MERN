// backend/src/routes/FeedRoutes.ts

import type { Express } from "express";
import { requireAuth } from "../middlewares/AuthMiddleware";
import FeedController from "../controllers/FeedController";


const routes = (app: Express) => {
    app.get("/feed", requireAuth, FeedController.getFeed);
};

export default { routes };
