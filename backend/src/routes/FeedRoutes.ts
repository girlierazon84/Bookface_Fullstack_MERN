// backend/src/routes/FeedRoutes.ts

import type { Express } from "express";
import { requireAuth } from "../middlewares/AuthMiddleware";
import { getFeed } from "../controllers/FeedController";


const routes = (app: Express) => {
    app.get("/feed", requireAuth, getFeed);
};

export default { routes };
