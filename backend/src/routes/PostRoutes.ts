// backend/src/routes/postRoutes.ts

import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware";
import * as postController from "../controllers/postController";
import { uploadPostMedia } from "../middlewares/uploadMiddleware"; // create it (multer)


const router = Router();

router.post("/", requireAuth, uploadPostMedia, postController.createPost);
router.get("/", postController.getAllPosts);

router.get("/:postId", postController.getPostById);
router.patch("/:postId", requireAuth, postController.updatePost);
router.delete("/:postId", requireAuth, postController.deletePost);

router.post("/:postId/like", requireAuth, postController.toggleLike);
router.post("/:postId/save", requireAuth, postController.savePost);
router.delete("/:postId/save", requireAuth, postController.unsavePost);

router.get("/:postId/copy", requireAuth, postController.copyPostPayload);

export default router;
