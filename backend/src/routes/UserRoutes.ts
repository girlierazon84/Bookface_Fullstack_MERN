// backend/src/routes/userRoutes.ts

import { Router } from "express";
import userController from "../controllers/userController";
import { requireAuth } from "../middlewares/authMiddleware";
import {
    uploadAvatar,
    uploadCover,
    multerErrorHandler
} from "../middlewares/uploadMiddleware";


const router = Router();

// Public
router.get("/users", userController.getAllUsers);
router.get("/users/search", userController.searchUsers);
router.get("/users/:userId", userController.getUserById);

// Protected
router.get("/users/me", requireAuth, userController.getMe);
router.patch("/users/me", requireAuth, userController.updateMe);

// Avatar / Cover
router.post("/users/me/avatar", requireAuth, uploadAvatar, multerErrorHandler, userController.uploadMyAvatar);
router.delete("/users/me/avatar", requireAuth, userController.deleteMyAvatar);

router.post("/users/me/cover", requireAuth, uploadCover, multerErrorHandler, userController.uploadMyCover);
router.delete("/users/me/cover", requireAuth, userController.deleteMyCover);

router.delete("/users/me", requireAuth, userController.deleteMe);

export default router;
