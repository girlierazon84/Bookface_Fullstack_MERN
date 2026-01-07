import mongoose, { Schema } from "mongoose";
import { CreateNewPost } from "../utils/interfaces/Posts";


const MODEL_NAME = process.env.MONGODB_COLLECTION_POST || "Post";

const newPostSchema = new Schema<CreateNewPost>(
    {
        author: String,
        title: String,
        content: String
    },
    { timestamps: true }
);

const PostModel =
    (mongoose.models[MODEL_NAME] as mongoose.Model<CreateNewPost>) ||
    mongoose.model<CreateNewPost>(MODEL_NAME, newPostSchema);

export default PostModel;
