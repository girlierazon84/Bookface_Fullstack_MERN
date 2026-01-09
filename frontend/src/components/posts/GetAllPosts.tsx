// frontend/src/components/posts/GetAllPosts.tsx

import React, { useEffect, useState } from "react";
import PostService, { type PostDTO, normalizePostsList } from "../../utils/api/service/PostService";


const GetAllPosts: React.FC = () => {
  const [allPostsInDatabase, setAllPostsInDatabase] = useState<PostDTO[]>([]);

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const res = await PostService.getAllPosts();
        const posts = normalizePostsList(res.data);
        if (!cancelled) setAllPostsInDatabase(posts);
      } catch {
        if (!cancelled) setAllPostsInDatabase([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div>
      {/* render your posts */}
      {allPostsInDatabase.map((p) => (
        <div key={p._id}>{p.content}</div>
      ))}
    </div>
  );
};

export default GetAllPosts;
