// frontend/src/utils/api/service/PostService.ts

import http from "../http";


export type FeedAuthor = {
    _id: string;
    username: string;
    firstname?: string;
    lastname?: string;
    avatarUrl?: string;
};

export type PostDTO = {
    _id: string;
    author: FeedAuthor;
    content: string;
    imageUrl?: string;
    likes: string[];
    createdAt: string;
    updatedAt: string;
};

export type CreatePostPayload = {
    content: string;
    imageUrl?: string;
};

const PostService = {
    getFeed: () => http.get<PostDTO[]>("/feed"),
    createPost: (payload: CreatePostPayload) => http.post<PostDTO>("/posts", payload)
};

export default PostService;
