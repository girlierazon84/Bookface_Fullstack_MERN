// backend/src/routes/CommentRoutes.ts

import type { Express } from "express";
import { requireAuth } from "../middlewares/AuthMiddleware";
import { getCommentsForPost, createComment } from "../controllers/CommentController";


const routes = (app: Express) => {
    app.get("/posts/:postId/comments", getCommentsForPost);
    app.post("/posts/:postId/comments", requireAuth, createComment);
};

export default { routes };
