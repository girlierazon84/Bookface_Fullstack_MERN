// backend/src/routes/friendRoutes.ts

import type { Express } from "express";
import friendController from "../controllers/friendController";


const routes = (app: Express) => {
    // Requests
    app.post("/friends/requests", friendController.sendFriendRequest);
    app.get("/friends/requests/incoming/:userId", friendController.getIncomingRequests);
    app.get("/friends/requests/outgoing/:userId", friendController.getOutgoingRequests);

    app.post("/friends/requests/:requestId/accept", friendController.acceptFriendRequest);
    app.post("/friends/requests/:requestId/reject", friendController.rejectFriendRequest);
    app.delete("/friends/requests/:requestId", friendController.cancelFriendRequest);

    // Friends
    app.get("/friends/:userId", friendController.getFriends);
    app.delete("/friends/:userId/:friendId", friendController.unfriend);
};

export default { routes };
