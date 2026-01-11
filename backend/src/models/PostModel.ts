// backend/src/models/postModel.ts

import { Schema, model, type Types } from "mongoose";


export type PostMediaType = "image" | "video";

export interface IPostMedia {
    url: string;
    publicId: string;
    type: PostMediaType;
    mime?: string;
    width?: number;
    height?: number;
    duration?: number;
}

export interface IPost {
    author: Types.ObjectId;
    content: string;

    // legacy field kept for backward compat:
    imageUrl?: string;

    // new:
    media: IPostMedia[];

    likes: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const postMediaSchema = new Schema<IPostMedia>(
    {
        url: { type: String, required: true, trim: true },
        publicId: { type: String, required: true, trim: true },
        type: { type: String, enum: ["image", "video"], required: true },
        mime: { type: String, default: "" },
        width: { type: Number },
        height: { type: Number },
        duration: { type: Number }
    },
    { _id: false }
);

const postSchema = new Schema<IPost>(
    {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        content: { type: String, required: true, trim: true, maxlength: 5000 },

        imageUrl: { type: String, default: "", trim: true }, // legacy
        media: { type: [postMediaSchema], default: [] },

        likes: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }]
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
