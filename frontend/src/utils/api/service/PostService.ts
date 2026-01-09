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
    author?: PostAuthorDTO;
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

/**
 * API can return:
 * - PostDTO[]
 * - { posts: PostDTO[] }
 * - { data: PostDTO[] }   (common wrapper)
 * - { items/results: PostDTO[] } (sometimes)
 */
export type PostsApiResponse =
    | PostDTO[]
    | { posts: PostDTO[] }
    | { data: PostDTO[] }
    | { items: PostDTO[] }
    | { results: PostDTO[] };

export type CreatePostApiResponse =
    | PostDTO
    | { post: PostDTO }
    | { data: PostDTO };

/** Normalize ANY posts list response into PostDTO[] */
export const normalizePostsList = (input: PostsApiResponse | unknown): PostDTO[] => {
    if (Array.isArray(input)) return input;

    if (input && typeof input === "object") {
        const maybe = (input as any).posts ?? (input as any).data ?? (input as any).items ?? (input as any).results;
        if (Array.isArray(maybe)) return maybe;
    }

    return [];
};

/** Normalize create-post response into PostDTO | null */
export const normalizeCreatedPost = (input: CreatePostApiResponse | unknown): PostDTO | null => {
    if (!input || typeof input !== "object") return null;

    // direct PostDTO shape
    if ("_id" in (input as any) && "content" in (input as any)) return input as PostDTO;

    const maybe = (input as any).post ?? (input as any).data;
    if (maybe && typeof maybe === "object" && "_id" in maybe && "content" in maybe) return maybe as PostDTO;

    return null;
};

const PostService = {
    // Feed
    getFeed: () => http.get<PostsApiResponse>("/feed"),

    // Create
    createPost: (payload: CreatePostPayload) => http.post<CreatePostApiResponse>("/posts", payload),

    // Admin/dev endpoints
    getAllPosts: () => http.get<PostsApiResponse>("/posts"),
    getPostById: (id: string) => http.get<PostDTO>(`/posts/${id}`),
    updatePost: (id: string, payload: UpdatePostPayload) => http.put<PostDTO>(`/posts/${id}`, payload),
    deletePostById: (id: string) => http.delete<{ message: string }>(`/posts/${id}`)
};

export default PostService;
