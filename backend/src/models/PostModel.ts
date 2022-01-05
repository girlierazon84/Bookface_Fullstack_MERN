import { Schema, model } from 'mongoose'
import { CreatePost } from "../utils/interfaces/Posts";

const dbCollection = process.env.MONGODB_COLLECTION

const postSchema = new Schema<CreatePost>({
        content: {
            type: String,
            required: true
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }],
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        timestamp:  {
            type: Date,
            required: true
        },
        photo:  {
            type: String
        }
    },
    {timestamps: true}
)

// 4. Create a Model.
const PostModel = model<CreatePost>(dbCollection, postSchema)

export default PostModel