import { Schema, model } from 'mongoose'
import { CreateNewPost } from "../utils/interfaces/Posts";
const dbCollection = process.env.MONGODB_COLLECTION_POST

const newPostSchema = new Schema<CreateNewPost>({
        author: String,
        title: String,
        content: String
    },
    { timestamps: true }
);


const PostModel = model<CreateNewPost>(dbCollection, newPostSchema)

export default PostModel