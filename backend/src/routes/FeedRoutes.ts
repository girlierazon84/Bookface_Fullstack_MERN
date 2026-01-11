// backend/src/routes/feedRoutes.ts

import type { Express } from "express";
import { requireAuth } from "../middlewares/authMiddleware";
import feedController from "../controllers/feedController";


const routes = (app: Express) => {
    app.get("/feed", requireAuth, feedController.getFeed);
};

export default { routes };
