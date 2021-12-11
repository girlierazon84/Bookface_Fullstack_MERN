import { Schema, model } from 'mongoose'
import dotenv from 'dotenv'

// 1. .env
dotenv.config()
const dbCollection = process.env.MONGODB_COLLECTION

interface Post {
    content: string;
    likes: object[];
    author: object;
    timestamp: Date;
    photo: string;
}

const postSchema = new Schema<Post>({
        content: {type: String, required: true},
        likes: [{type: Schema.Types.ObjectId, ref: 'User', required: true}],
        author: {type: Schema.Types.ObjectId, ref: 'User', required: true},
        timestamp:  {type: Date, required: true},
        photo:  {type: String}
    },
    {timestamps: true}
)

// 4. Create a Model.
const PostModel = model<Post>(dbCollection, postSchema)

export default PostModel