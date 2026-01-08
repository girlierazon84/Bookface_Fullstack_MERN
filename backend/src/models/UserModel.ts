// backend/src/models/UserModel.ts

import { Schema, model, type Types } from "mongoose";


export interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    passwordHash: string;

    avatarUrl?: string;
    bio?: string;

    friends: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        firstname: { type: String, required: true, trim: true, maxlength: 60 },
        lastname: { type: String, required: true, trim: true, maxlength: 60 },
        email: { type: String, required: true, unique: true, lowercase: true, trim: true, maxlength: 320 },
        username: { type: String, required: true, unique: true, trim: true, maxlength: 40 },

        passwordHash: { type: String, required: true },

        avatarUrl: { type: String, default: "" },
        bio: { type: String, default: "", maxlength: 280 },

        friends: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }]
    },
    {
        timestamps: true,
        toJSON: {
            transform: (_doc, ret) => {
                delete ret.passwordHash;
                return ret;
            }
        }
    }
);

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ friends: 1 });

export default model<IUser>("User", userSchema);
