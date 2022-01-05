import { Schema, model } from 'mongoose'
import dotenv from 'dotenv'
import {CreateFriendRequest} from "../utils/interfaces/FriendRequest";

// 1. .env
dotenv.config()
const dbCollection = process.env.MONGODB_COLLECTION

const friendRequestSchema = new Schema<CreateFriendRequest>({
        sender: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        receiver: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {timestamps: true}
)

// 4. Create a Model.
const FriendRequestModel = model<CreateFriendRequest>(dbCollection, friendRequestSchema)

export default FriendRequestModel