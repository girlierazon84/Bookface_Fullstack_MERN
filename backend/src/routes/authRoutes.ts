// backend/src/routes/authRoutes.ts

import { Router } from "express";
import { register, login, me } from "../controllers/authController";
import { requireAuth } from "../middlewares/authMiddleware";


const router = Router();

router.post("/auth/register", register);
router.post("/auth/login", login);
router.get("/auth/me", requireAuth, me);

export default router;
