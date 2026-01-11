// backend/src/routes/index.ts

import { Router } from "express";

import aliveRoutes from "./aliveRoutes";
import authRoutes from "./authRoutes";
import feedRoutes from "./feedRoutes";
import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";
import commentRoutes from "./commentRoutes";
import friendRoutes from "./friendRoutes";
import userMediaRoutes from "./userMediaRoutes";

const router = Router();

router.use(aliveRoutes);
router.use(authRoutes);
router.use(feedRoutes);
router.use(userRoutes);
router.use(postRoutes);
router.use(commentRoutes);
router.use(friendRoutes);
router.use(userMediaRoutes);

export default router;
