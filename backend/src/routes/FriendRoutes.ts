// backend/src/routes/FriendRoutes.ts

import type { Express } from "express";
import FriendController from "../controllers/FriendController";


const routes = (app: Express) => {
    // Requests
    app.post("/friends/requests", FriendController.sendFriendRequest);
    app.get("/friends/requests/incoming/:userId", FriendController.getIncomingRequests);
    app.get("/friends/requests/outgoing/:userId", FriendController.getOutgoingRequests);

    app.post("/friends/requests/:requestId/accept", FriendController.acceptFriendRequest);
    app.post("/friends/requests/:requestId/reject", FriendController.rejectFriendRequest);
    app.delete("/friends/requests/:requestId", FriendController.cancelFriendRequest);

    // Friends
    app.get("/friends/:userId", FriendController.getFriends);
    app.delete("/friends/:userId/:friendId", FriendController.unfriend);
};

export default { routes };
