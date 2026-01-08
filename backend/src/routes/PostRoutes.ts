// backend/src/routes/PostRoutes.ts

import type { Express } from "express";
import { requireAuth } from "../middlewares/AuthMiddleware";
import * as PostController from "../controllers/PostController";


const postUrl = "/posts";

const routes = (app: Express) => {
    app.post(postUrl, requireAuth, PostController.createPost);
    app.get(postUrl, PostController.getAllPosts);

    app.get(`${postUrl}/:postId`, PostController.getPostById);
    app.delete(`${postUrl}/:postId`, requireAuth, PostController.deletePost);

    app.post(`${postUrl}/:postId/like`, requireAuth, PostController.toggleLike);
};

export default { routes };
