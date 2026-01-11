// backend/src/routes/commentRoutes.ts

import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware";
import {
    getCommentsForPost,
    createComment
} from "../controllers/commentController";


const router = Router();

router.get("/posts/:postId/comments", getCommentsForPost);
router.post("/posts/:postId/comments", requireAuth, createComment);

export default router;
