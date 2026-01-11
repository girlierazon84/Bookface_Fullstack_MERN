// backend/src/models/postModel.ts

import { Schema, model, type Types } from "mongoose";


export type PostMediaType = "image" | "video";

export interface IPostMedia {
    url: string;
    publicId: string;
    type: PostMediaType;
}

export interface IPost {
    author: Types.ObjectId;
    content: string;

    // legacy single imageUrl kept for backward compatibility (optional)
    imageUrl?: string;

    // new: multiple media items
    media: IPostMedia[];

    likes: Types.ObjectId[];

    editedAt?: Date;
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new Schema<IPost>(
    {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        content: { type: String, required: true, trim: true, maxlength: 5000 },

        imageUrl: { type: String, default: "", trim: true },

        media: [
            {
                url: { type: String, required: true },
                publicId: { type: String, required: true },
                type: { type: String, enum: ["image", "video"], required: true }
            }
        ],

        likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],

        editedAt: { type: Date }
    },
    {
        timestamps: true,
        toJSON: {
            transform: (_doc, ret) => {
                delete ret.__v;
                return ret;
            }
        }
    }
);

postSchema.index({ createdAt: -1 });
postSchema.index({ author: 1, createdAt: -1 });

export default model<IPost>("Post", postSchema);
