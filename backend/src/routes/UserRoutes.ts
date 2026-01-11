// backend/src/routes/userRoutes.ts

import { Router } from "express";
import userController from "../controllers/userController";
import { requireAuth } from "../middlewares/authMiddleware";


const router = Router();

// Public
router.get("/users", userController.getAllUsers);
router.get("/users/search", userController.searchUsers);
router.get("/users/:userId", userController.getUserById);

// Protected
router.patch("/users/me", requireAuth, userController.updateMe);
router.delete("/users/me", requireAuth, userController.deleteMe);

export default router;
