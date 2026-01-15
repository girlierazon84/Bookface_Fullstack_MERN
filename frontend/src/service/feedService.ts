// frontend/src/service/feedService.ts

import http from "./http";
import type { PostDTO } from "./postService";


// Define a type that encompasses all possible response shapes
type FeedApiResponse =
    | PostDTO[]
    | { posts: PostDTO[] }
    | { data: PostDTO[] }
    | { feed: PostDTO[] }
    | { results: PostDTO[] };

// Function to normalize various response shapes into a PostDTO array
export const normalizeFeedPosts = (payload: unknown): PostDTO[] => {
    // Direct array case
    if (Array.isArray(payload)) return payload as PostDTO[];

    // Object with possible array properties
    if (payload && typeof payload === "object") {
        // Type assertion to access properties
        const obj = payload as any;

        // Check known properties for arrays
        if (Array.isArray(obj.posts)) return obj.posts as PostDTO[];
        if (Array.isArray(obj.data)) return obj.data as PostDTO[];
        if (Array.isArray(obj.feed)) return obj.feed as PostDTO[];
        if (Array.isArray(obj.results)) return obj.results as PostDTO[];
    }

    return [];
};

// feedService with normalized method for UI usage
const feedService = {
    // keep raw endpoint if you want it elsewhere
    getFeed: () => http.get<FeedApiResponse>("/feed"),

    // ✅ recommended for UI usage
    getFeedPosts: async (): Promise<PostDTO[]> => {
        // Fetch the feed data from the API
        const res = await http.get<FeedApiResponse>("/feed");
        return normalizeFeedPosts(res.data);
    },
};

export default feedService;
