// backend/src/routes/userMediaRoutes.ts

import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware";
import { uploadAvatar, uploadCover, multerErrorHandler } from "../middlewares/uploadMiddleware";
import { uploadMyAvatar, deleteMyAvatar, uploadMyCover, deleteMyCover } from "../controllers/userMediaController";


const router = Router();

router.post("/users/me/avatar", requireAuth, uploadAvatar, multerErrorHandler, uploadMyAvatar);
router.delete("/users/me/avatar", requireAuth, deleteMyAvatar);

router.post("/users/me/cover", requireAuth, uploadCover, multerErrorHandler, uploadMyCover);
router.delete("/users/me/cover", requireAuth, deleteMyCover);

export default router;
