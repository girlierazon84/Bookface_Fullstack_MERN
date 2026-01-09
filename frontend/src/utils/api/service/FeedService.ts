// frontend/src/utils/api/service/FeedService.ts

import http from "../http";
import type { PostDTO } from "./PostService";


type FeedApiResponse =
    | PostDTO[]
    | { posts: PostDTO[] }
    | { data: PostDTO[] }
    | { feed: PostDTO[] }
    | { results: PostDTO[] };

export const normalizeFeedPosts = (payload: unknown): PostDTO[] => {
    if (Array.isArray(payload)) return payload as PostDTO[];

    if (payload && typeof payload === "object") {
        const obj = payload as any;

        if (Array.isArray(obj.posts)) return obj.posts as PostDTO[];
        if (Array.isArray(obj.data)) return obj.data as PostDTO[];
        if (Array.isArray(obj.feed)) return obj.feed as PostDTO[];
        if (Array.isArray(obj.results)) return obj.results as PostDTO[];
    }

    return [];
};

const FeedService = {
    // keep raw endpoint if you want it elsewhere
    getFeed: () => http.get<FeedApiResponse>("/feed"),

    // ✅ recommended for UI usage
    getFeedPosts: async (): Promise<PostDTO[]> => {
        const res = await http.get<FeedApiResponse>("/feed");
        return normalizeFeedPosts(res.data);
    },
};

export default FeedService;
