// frontend/src/utils/api/service/PostService.ts

import http from "../http";


// Author information within a post
export type PostAuthorDTO = {
    _id: string;
    username: string;
    firstname?: string;
    lastname?: string;
    avatarUrl?: string;
};

// Post data transfer object
export type PostDTO = {
    _id: string;
    author?: PostAuthorDTO;
    content: string;
    imageUrl?: string;
    createdAt: string;
    updatedAt: string;
};

// Payload for creating a new post
export type CreatePostPayload = {
    content: string;
    imageUrl?: string;
};

// Payload for updating an existing post (partial)
export type UpdatePostPayload = Partial<CreatePostPayload>;

/**---------------------------------------------------
    API can return:
        - PostDTO[]
        - { posts: PostDTO[] }
        - { data: PostDTO[] }   (common wrapper)
        - { items/results: PostDTO[] } (sometimes)
------------------------------------------------------*/
// Possible responses for posts list endpoints
export type PostsApiResponse =
    | PostDTO[]
    | { posts: PostDTO[] }
    | { data: PostDTO[] }
    | { items: PostDTO[] }
    | { results: PostDTO[] };

// Possible responses for create-post endpoint
export type CreatePostApiResponse =
    | PostDTO
    | { post: PostDTO }
    | { data: PostDTO };

/**-----------------------------------------------------
    Normalize ANY posts list response into PostDTO[]
--------------------------------------------------------*/
export const normalizePostsList = (input: PostsApiResponse | unknown): PostDTO[] => {
    // direct array case
    if (Array.isArray(input)) return input;

    // wrapped array case
    if (input && typeof input === "object") {
        // check common wrappers for arrays
        const maybe = (input as any).posts ?? (input as any).data ?? (input as any).items ?? (input as any).results;
        if (Array.isArray(maybe)) return maybe;
    }

    // fallback to empty array
    return [];
};

/**-------------------------------------------------------
    Normalize create-post response into PostDTO | null
----------------------------------------------------------*/
export const normalizeCreatedPost = (input: CreatePostApiResponse | unknown): PostDTO | null => {
    // direct null/invalid case
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
