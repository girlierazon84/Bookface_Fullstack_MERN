// backend/src/routes/index.ts

import { Router } from "express";

import aliveRoutes from "./aliveRoutes";
import authRoutes from "./authRoutes";
import userRoutes from "./userRoutes";
import postRoutes from "./postRoutes";
import feedRoutes from "./feedRoutes";
import commentRoutes from "./commentRoutes";
import friendRoutes from "./friendRoutes";


const router = Router();

// health
router.use(aliveRoutes);

// auth
router.use(authRoutes);

// app features
router.use(userRoutes);
router.use(postRoutes);
router.use(feedRoutes);
router.use(commentRoutes);
router.use(friendRoutes);

export default router;
