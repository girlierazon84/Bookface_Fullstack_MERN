// backend/src/models/PostModel.ts

import { Schema, model, type Types } from "mongoose";


export interface IPost {
    author: Types.ObjectId;
    content: string;
    imageUrl?: string;

    likes: Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const postSchema = new Schema<IPost>(
    {
        author: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        content: { type: String, required: true, trim: true, maxlength: 5000 },
        imageUrl: { type: String, default: "", trim: true },

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
postSchema.index({ likes: 1 });

export default model<IPost>("Post", postSchema);
