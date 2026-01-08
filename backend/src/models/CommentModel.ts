// backend/src/models/CommentModel.ts

import { Schema, model, type Types } from "mongoose";


export interface IComment {
    post: Types.ObjectId;
    author: Types.ObjectId;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
    {
        post: { type: Schema.Types.ObjectId, ref: "Post", required: true, index: true },
        author: { type: Schema.Types.ObjectId, ref: "User", required: true, index: true },
        content: { type: String, required: true, trim: true, maxlength: 2000 }
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

commentSchema.index({ post: 1, createdAt: 1 });

export default model<IComment>("Comment", commentSchema);
