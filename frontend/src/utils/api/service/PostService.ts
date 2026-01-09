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

// ✅ backend sometimes wraps arrays/objects — normalize it once
type PostsApiResponse =
    | PostDTO[]
    | { posts: PostDTO[] }
    | { data: PostDTO[] }
    | { data: { posts: PostDTO[] } }
    | { feed: PostDTO[] }
    | { results: PostDTO[] };

export const normalizePostsArray = (payload: unknown): PostDTO[] => {
    if (Array.isArray(payload)) return payload as PostDTO[];

    if (payload && typeof payload === "object") {
        const obj: any = payload;

        if (Array.isArray(obj.posts)) return obj.posts;
        if (Array.isArray(obj.data)) return obj.data;
        if (obj.data && Array.isArray(obj.data.posts)) return obj.data.posts;
        if (Array.isArray(obj.feed)) return obj.feed;
        if (Array.isArray(obj.results)) return obj.results;
    }

    return [];
};

type CreatePostResponse = PostDTO | { post: PostDTO } | { data: PostDTO } | { data: { post: PostDTO } };

export const normalizeCreatedPost = (payload: unknown): PostDTO | null => {
    if (payload && typeof payload === "object") {
        const obj: any = payload;

        // raw PostDTO
        if (obj._id && obj.content) return obj as PostDTO;

        if (obj.post && obj.post._id) return obj.post as PostDTO;
        if (obj.data && obj.data._id) return obj.data as PostDTO;
        if (obj.data?.post && obj.data.post._id) return obj.data.post as PostDTO;
    }
    return null;
};

const PostService = {
    // Facebook-like
    getFeed: () => http.get<PostsApiResponse>("/feed"),

    // ✅ use this in UI (always returns PostDTO[])
    getFeedPosts: async (): Promise<PostDTO[]> => {
        const res = await http.get<PostsApiResponse>("/feed");
        return normalizePostsArray(res.data);
    },

    createPost: (payload: CreatePostPayload) => http.post<CreatePostResponse>("/posts", payload),

    // admin/dev endpoints
    getAllPosts: () => http.get<PostsApiResponse>("/posts"),

    // ✅ safe helper if you ever need it
    getAllPostsList: async (): Promise<PostDTO[]> => {
        const res = await http.get<PostsApiResponse>("/posts");
        return normalizePostsArray(res.data);
    },

    getPostById: (id: string) => http.get<PostDTO>(`/posts/${id}`),

    updatePost: (id: string, payload: UpdatePostPayload) => http.put<PostDTO>(`/posts/${id}`, payload),

    deletePostById: (id: string) => http.delete<{ message: string }>(`/posts/${id}`),
};

export default PostService;
