// frontend/src/utils/api/service/FeedService.ts

import http from "../http";
import type { PostDTO } from "./PostService";


const FeedService = {
    getFeed: () => http.get<PostDTO[]>("/feed")
};

export default FeedService;
