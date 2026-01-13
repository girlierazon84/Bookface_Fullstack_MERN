// backend/src/models/userModel.ts

import { Schema, model, type Types } from "mongoose";


export interface IUser {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    passwordHash: string;

    avatarUrl?: string;
    avatarPublicId?: string;

    coverUrl?: string;
    coverPublicId?: string;

    bio?: string;

    friends: Types.ObjectId[];
    savedPosts: Types.ObjectId[];

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

        avatarUrl: { type: String, default: "", trim: true },
        avatarPublicId: { type: String, default: "", trim: true },

        coverUrl: { type: String, default: "", trim: true },
        coverPublicId: { type: String, default: "", trim: true },

        bio: { type: String, default: "", trim: true, maxlength: 280 },

        friends: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
        savedPosts: [{ type: Schema.Types.ObjectId, ref: "Post", default: [] }]
    },
    {
        timestamps: true,
        toJSON: {
            transform: (_doc, ret) => {
                delete ret.passwordHash;
                delete ret.__v;
                return ret;
            }
        }
    }
);

userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ username: "text", firstname: "text", lastname: "text" });

export default model<IUser>("User", userSchema);
