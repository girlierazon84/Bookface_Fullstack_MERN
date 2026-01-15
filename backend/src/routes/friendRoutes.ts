// backend/src/routes/friendRoutes.ts

import { Router } from "express";
import { requireAuth } from "../middlewares/authMiddleware";
import friendController from "../controllers/friendController";


const router = Router();

// Requests
router.post("/friends/requests", requireAuth, friendController.sendFriendRequest);
router.get("/friends/requests/incoming/:userId", requireAuth, friendController.getIncomingRequests);
router.get("/friends/requests/outgoing/:userId", requireAuth, friendController.getOutgoingRequests);

router.post("/friends/requests/:requestId/accept", requireAuth, friendController.acceptFriendRequest);
router.post("/friends/requests/:requestId/reject", requireAuth, friendController.rejectFriendRequest);
router.delete("/friends/requests/:requestId", requireAuth, friendController.cancelFriendRequest);

// Friends
router.get("/friends/:userId", requireAuth, friendController.getFriends);
router.delete("/friends/:userId/:friendId", requireAuth, friendController.unfriend);

export default router;
