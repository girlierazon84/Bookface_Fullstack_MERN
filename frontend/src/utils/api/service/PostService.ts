// frontend/src/utils/api/service/PostService.ts

import type { CreatePostObject, PostDataObject } from "../../interface/PostInterface";
import http from "../http";


const postUrl = "/posts";
export type UpdatePostObject = Partial<CreatePostObject>;

const PostService = {
    createPost: (payload: CreatePostObject) => http.post<PostDataObject>(postUrl, payload),

    getAllPosts: () => http.get<PostDataObject[]>(postUrl),

    getPostById: (id: string) => http.get<PostDataObject>(`${postUrl}/${id}`),

    updatePost: (id: string, payload: UpdatePostObject) =>
        http.put<PostDataObject>(`${postUrl}/${id}`, payload),

    deletePostById: (id: string) => http.delete(`${postUrl}/${id}`)
};

export default PostService;
