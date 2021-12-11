import { Schema, model } from 'mongoose'
import dotenv from 'dotenv'

// 1. .env
dotenv.config()
const dbCollection = process.env.MONGODB_COLLECTION

// 2. Create an interface representing a document in MongoDB.
interface Comment {
    content: string;
    likes: object[];
    post: object;
    author: object;
}

// 3. Create a Schema corresponding to the document interface.
const commentSchema = new Schema<Comment>({
        content: {
            type: String,
            required: true
        },
        likes: [{
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }],
        post: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
            required: true
        },
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true
        }
    },
    {timestamps: true}
)

// 4. Create a Model.
const CommentModel = model<Comment>(dbCollection, commentSchema)

export default CommentModel