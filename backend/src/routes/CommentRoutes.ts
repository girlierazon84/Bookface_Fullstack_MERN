// backend/src/routes/commentRoutes.ts

import type { Express } from "express";
import { requireAuth } from "../middlewares/authMiddleware";
import { getCommentsForPost, createComment } from "../controllers/commentController";


const routes = (app: Express) => {
    app.get("/posts/:postId/comments", getCommentsForPost);
    app.post("/posts/:postId/comments", requireAuth, createComment);
};

export default { routes };
