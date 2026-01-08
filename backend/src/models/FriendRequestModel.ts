// backend/src/models/FriendRequestModel.ts

import { Schema, model, type Types } from "mongoose";


export type FriendRequestStatus = "pending" | "accepted" | "rejected";

export interface IFriendRequest {
    from: Types.ObjectId;
    to: Types.ObjectId;
    status: FriendRequestStatus;
    createdAt: Date;
    updatedAt: Date;
}

const friendRequestSchema = new Schema<IFriendRequest>(
    {
        from: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        to: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        status: { type: String, enum: ["pending", "accepted", "rejected"], default: "pending", index: true }
    },
    {
        timestamps: true,
        toJSON: {
            transform: (_doc, ret) => {
                delete ret.__v;
                return ret;
            }
        }
    }
);

friendRequestSchema.index({ from: 1, to: 1 }, { unique: true });
friendRequestSchema.index({ to: 1, status: 1, createdAt: -1 });

export default model<IFriendRequest>("FriendRequest", friendRequestSchema);
