// backend/src/routes/postRoutes.ts

import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware";
import {
    uploadPostMedia,
    multerErrorHandler
} from "../middlewares/uploadMiddleware";
import * as postController from "../controllers/postController";


const router = Router();

// Create post (multipart: content + media[])
router.post("/posts", requireAuth, uploadPostMedia, multerErrorHandler, postController.createPost);

// Read
router.get("/posts", postController.getAllPosts);
router.get("/posts/saved/me", requireAuth, postController.getMySavedPosts);
router.get("/posts/:postId", postController.getPostById);

// Edit + delete
router.patch("/posts/:postId", requireAuth, postController.updatePost);
router.delete("/posts/:postId", requireAuth, postController.deletePost);

// Like + save + copy
router.post("/posts/:postId/like", requireAuth, postController.toggleLike);
router.post("/posts/:postId/save", requireAuth, postController.toggleSave);
router.post("/posts/:postId/copy", requireAuth, postController.copyPost);

// Media delete
router.delete("/posts/:postId/media/:publicId", requireAuth, postController.deletePostMediaItem);

export default router;
