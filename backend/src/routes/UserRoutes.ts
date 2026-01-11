// backend/src/routes/userRoutes.ts

import { Router } from "express";
import userController from "../controllers/userController";
import { requireAuth } from "../middlewares/authMiddleware";


const router = Router();

// Public
router.get("/", userController.getAllUsers);
router.get("/search", userController.searchUsers);
router.get("/:userId", userController.getUserById);

// Protected
router.patch("/me", requireAuth, userController.updateMe);
router.delete("/me", requireAuth, userController.deleteMe);

export default router;
