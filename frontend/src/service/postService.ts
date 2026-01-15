// frontend/src/service/postService.ts

import http from "./http";


export type PostAuthorDTO = {
    _id: string;
    username: string;
    firstname?: string;
    lastname?: string;
    avatarUrl?: string;
};

export type PostMediaType = "image" | "video";

export type PostMediaDTO = {
    url: string;
    publicId: string;
    type: PostMediaType;
    mime?: string;
    width?: number;
    height?: number;
    duration?: number;
};

export type PostDTO = {
    _id: string;
    author?: PostAuthorDTO;
    content: string;
    imageUrl?: string; // legacy
    media?: PostMediaDTO[];
    createdAt: string;
    updatedAt: string;
};

export type CreatePostPayload = {
    content: string;
    files?: File[];
};

export type UpdatePostPayload = Partial<Pick<CreatePostPayload, "content">>;

export type PostsApiResponse =
    | PostDTO[]
    | { posts: PostDTO[] }
    | { data: PostDTO[] }
    | { items: PostDTO[] }
    | { results: PostDTO[] };

export type CreatePostApiResponse = PostDTO | { post: PostDTO } | { data: PostDTO };

export const normalizePostsList = (input: PostsApiResponse | unknown): PostDTO[] => {
    if (Array.isArray(input)) return input;
    if (input && typeof input === "object") {
        const maybe = (input as any).posts ?? (input as any).data ?? (input as any).items ?? (input as any).results;
        if (Array.isArray(maybe)) return maybe;
    }
    return [];
};

export const normalizeCreatedPost = (input: CreatePostApiResponse | unknown): PostDTO | null => {
    if (!input || typeof input !== "object") return null;
    if ("_id" in (input as any) && "content" in (input as any)) return input as PostDTO;

    const maybe = (input as any).post ?? (input as any).data;
    if (maybe && typeof maybe === "object" && "_id" in maybe && "content" in maybe) return maybe as PostDTO;
    return null;
};

const postService = {
    // Feed (protected backend endpoint)
    getFeed: () => http.get<PostsApiResponse>("/feed"),

    // All posts
    getAllPosts: () => http.get<PostsApiResponse>("/posts"),
    getPostById: (id: string) => http.get<PostDTO>(`/posts/${id}`),

    // Create: supports JSON (no files) or multipart (files)
    createPost: (payload: CreatePostPayload) => {
        const content = payload.content?.trim() ?? "";
        const hasFiles = Boolean(payload.files?.length);

        // prevent accidental empty posts
        if (!content && !hasFiles) {
            return http.post<CreatePostApiResponse>("/posts", { content: "" });
        }

        if (!hasFiles) {
            return http.post<CreatePostApiResponse>("/posts", { content });
        }

        const form = new FormData();
        form.append("content", content);
        payload.files!.forEach((f) => form.append("media", f)); // ✅ backend expects media[]

        return http.post<CreatePostApiResponse>("/posts", form);
    },

    // Update: backend uses PATCH
    updatePost: (id: string, payload: UpdatePostPayload) => http.patch<PostDTO>(`/posts/${id}`, payload),

    deletePostById: (id: string) => http.delete<{ message: string }>(`/posts/${id}`),

    // saved
    getMySavedPosts: () => http.get<PostDTO[]>("/posts/saved/me"),

    // like/save/copy
    like: (id: string) => http.post<PostDTO>(`/posts/${id}/like`),
    save: (id: string) => http.post<{ saved: boolean }>(`/posts/${id}/save`),
    copy: (id: string) => http.post<PostDTO>(`/posts/${id}/copy`)
};

export default postService;
