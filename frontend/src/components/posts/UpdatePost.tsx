// frontend/src/components/posts/UpdatePost.tsx

import React, { useState } from "react";
import PostService, { type PostDTO } from "../../utils/api/service/PostService";


const UpdatePost: React.FC = () => {
  const [id, setId] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [postObject, setPostObject] = useState<PostDTO | null>(null);

  const update = async () => {
    try {
      const res = await PostService.updatePost(id, {
        content: content.trim(),
        imageUrl: imageUrl.trim() || undefined
      });
      setPostObject(res.data);
    } catch {
      setPostObject(null);
    }
  };

  return (
    <div>
      <input value={id} onChange={(e) => setId(e.target.value)} placeholder="Post id" />
      <textarea value={content} onChange={(e) => setContent(e.target.value)} placeholder="New content" />
      <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL (optional)" />
      <button onClick={update}>Update</button>
      <pre>{JSON.stringify(postObject, null, 2)}</pre>
    </div>
  );
};

export default UpdatePost;
