// backend/src/routes/feedRoutes.ts

import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware";
import feedController from "../controllers/feedController";


const router = Router();
router.get("/feed", requireAuth, feedController.getFeed);

export default router;
