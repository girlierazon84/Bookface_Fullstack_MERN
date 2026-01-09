// frontend/src/components/posts/GetPostById.tsx

import React, { useState } from "react";
import PostService, { type PostDTO } from "../../utils/api/service/PostService";


const GetPostById: React.FC = () => {
  const [id, setId] = useState("");
  const [onePost, setOnePost] = useState<PostDTO | null>(null);

  const getPost = async () => {
    try {
      const res = await PostService.getPostById(id);
      setOnePost(res.data);
    } catch {
      setOnePost(null);
    }
  };

  return (
    <div>
      <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Post id" />
      <button onClick={getPost}>Get</button>
      <pre>{JSON.stringify(onePost, null, 2)}</pre>
    </div>
  );
};

export default GetPostById;
