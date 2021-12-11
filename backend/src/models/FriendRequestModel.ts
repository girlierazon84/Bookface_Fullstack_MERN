import { Schema, model } from 'mongoose'
import dotenv from 'dotenv'

// 1. .env
dotenv.config()
const dbCollection = process.env.MONGODB_COLLECTION

interface FriendRequest {
    sender: object;
    receiver: object;
}

const friendRequestSchema = new Schema<FriendRequest>({
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
const FriendRequestModel = model<FriendRequest>(dbCollection, friendRequestSchema)

export default FriendRequestModel