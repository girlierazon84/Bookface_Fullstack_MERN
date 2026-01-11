// backend/src/schemas/friend.schema.ts

import { z } from "zod";
import { objectIdSchema } from "./common.schema";


export const sendFriendRequestSchema = z.object({
    toUserId: objectIdSchema
});
