// frontend/src/utils/api/service/PostService.ts

import http from "../http";


export type PostAuthorDTO = {
    _id: string;
    username: string;
    firstname?: string;
    lastname?: string;
    avatarUrl?: string;
};

export type PostDTO = {
    _id: string;
    author?: PostAuthorDTO; // ✅ no string union
    content: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
};

export type CreatePostPayload = {
    content: string;
    imageUrl?: string;
};

export type UpdatePostPayload = Partial<CreatePostPayload>;

const PostService = {
    // Facebook-like
    getFeed: () => http.get<PostDTO[]>("/feed"),

    createPost: (payload: CreatePostPayload) => http.post<PostDTO>("/posts", payload),

    // keep older admin/dev endpoints if your UI still uses them
    getAllPosts: () => http.get<PostDTO[]>("/posts"),
    getPostById: (id: string) => http.get<PostDTO>(`/posts/${id}`),
    updatePost: (id: string, payload: UpdatePostPayload) => http.put<PostDTO>(`/posts/${id}`, payload),
    deletePostById: (id: string) => http.delete<{ message: string }>(`/posts/${id}`)
};

export default PostService;
