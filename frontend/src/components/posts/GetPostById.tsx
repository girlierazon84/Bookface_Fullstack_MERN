// frontend/src/components/posts/GetPostById.tsx

import { useState } from "react";
import { JsonToTable } from "react-json-to-table";
import styled from "styled-components";

import type { PostDataObject } from "../../utils/interface/PostInterface";
import PostService from "../../utils/api/service/PostService";


const GetPostById: React.FC = () => {
  const [onePost, setOnePost] = useState<PostDataObject | null>(null);
  const [id, setId] = useState("");

  const getPost = async () => {
    try {
      const res = await PostService.getPostById(id);
      setOnePost(res.data);
    } catch {
      setOnePost(null);
    }
  };

  const clearInputs = () => {
    setId("");
    setOnePost(null);
  };

  return (
    <Article>
      <H1>Get Post by ID</H1>

      <Input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />

      <JsonToTable json={onePost ?? {}} />

      <GridContainer>
        <Button type="button" onClick={getPost}>
          Get Post By ID
        </Button>
        <Button type="button" onClick={clearInputs}>
          Clear
        </Button>
      </GridContainer>
    </Article>
  );
};

export default GetPostById;

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
  margin-bottom: 1em;
  padding: 1em;
  border-radius: 10px;
  font-size: 1em;
  border: 1px solid var(--fifthly-color);
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
