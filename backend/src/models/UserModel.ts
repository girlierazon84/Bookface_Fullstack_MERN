import mongoose, { Schema } from "mongoose";
import { CreateNewUser } from "../utils/interfaces/Users";


const MODEL_NAME = process.env.MONGODB_COLLECTION_USER || "User";

const newUserSchema = new Schema<CreateNewUser>(
    {
        firstname: { type: String, required: true },
        lastname: { type: String, required: true },
        email: { type: String, required: true },
        username: { type: String, unique: true, required: true },
        password: { type: String, required: true }
    },
    { timestamps: true }
);

const UserModel =
    (mongoose.models[MODEL_NAME] as mongoose.Model<CreateNewUser>) ||
    mongoose.model<CreateNewUser>(MODEL_NAME, newUserSchema);

export default UserModel;
