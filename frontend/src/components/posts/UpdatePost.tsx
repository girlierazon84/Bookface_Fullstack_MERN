// frontend/src/components/posts/UpdatePost.tsx

import { useState } from "react";
import { JsonToTable } from "react-json-to-table";
import styled from "styled-components";

import type { CreatePostObject, PostDataObject } from "../../utils/interface/PostInterface";
import PostService from "../../utils/api/service/PostService";


const UpdatePost: React.FC = () => {
  const [postObject, setPostObject] = useState<PostDataObject | null>(null);
  const [id, setId] = useState("");
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const updatePost = async () => {
    const payload: Partial<CreatePostObject> = {
      ...(author ? { author } : {}),
      ...(title ? { title } : {}),
      ...(content ? { content } : {})
    };

    try {
      const res = await PostService.updatePost(id, payload);
      setPostObject(res.data);
    } catch {
      setPostObject(null);
    }
  };

  const clearInputs = () => {
    setId("");
    setAuthor("");
    setTitle("");
    setContent("");
    setPostObject(null);
  };

  return (
    <Article>
      <H1>Update Post</H1>

      <Input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
      <Input placeholder="Author" value={author} onChange={(e) => setAuthor(e.target.value)} />
      <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
      <TextArea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />

      <JsonToTable json={postObject ?? {}} />

      <GridContainer>
        <Button type="button" onClick={updatePost}>
          Update Post
        </Button>
        <Button type="button" onClick={clearInputs}>
          Clear
        </Button>
      </GridContainer>
    </Article>
  );
};

export default UpdatePost;

const Article = styled.article`
  padding: 1em;
  border: 1px solid var(--thirdly-color);
  box-shadow: 0 10px 8px 5px var(--fourthly-color);
  border-radius: 1em;
  background-color: var(--thirdly-color);
`;

const H1 = styled.h1`
  font-size: 2em;
  color: var(--fourthly-color);
  font-family: "Oxygen - Regular", sans-serif;
`;

const Input = styled.input`
  background-color: var(--fifthly-color);
  width: 100%;
  padding: 1em;
  border-radius: 10px;
  margin-bottom: 1em;
  font-size: 1em;
  border: 1px solid var(--fifthly-color);
`;

const TextArea = styled.textarea`
  background-color: var(--fifthly-color);
  width: 100%;
  padding: 1em;
  border-radius: 10px;
  margin-bottom: 1em;
  font-size: 1em;
  border: 1px solid var(--fifthly-color);
  min-height: 120px;
`;

const GridContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const Button = styled.button`
  width: 100%;
  text-transform: uppercase;
  font-family: "Oxygen - Regular", sans-serif;
  font-size: 1em;
  font-weight: bold;
  padding: 10px;
  border-radius: 0.8em;
  background-color: var(--secondary-color);
  color: var(--fifthly-color);
  border: 1px solid var(--fifthly-color);
  cursor: pointer;

  &:hover {
    background-color: var(--fifthly-color);
    color: var(--secondary-color);
  }
`;
