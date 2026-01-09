// frontend/src/components/posts/GetAllPosts.tsx

import React, { useState } from "react";
import styled from "styled-components";
import { JsonToTable } from "react-json-to-table";

import PostService, {
  type PostDTO,
  normalizePostsList
} from "../../utils/api/service/PostService";


const GetAllPosts: React.FC = () => {
  const [allPostsInDatabase, setAllPostsInDatabase] = useState<PostDTO[]>([]);

  const getPosts = async () => {
    try {
      const res = await PostService.getAllPosts();
      const posts = normalizePostsList(res.data);
      setAllPostsInDatabase(posts);
    } catch {
      setAllPostsInDatabase([]);
    }
  };

  return (
    <Article>
      <H1>Get All Posts from Database</H1>

      <JsonToTable json={allPostsInDatabase} />

      <GridContainer>
        <Button type="button" onClick={getPosts}>
          Get All Posts
        </Button>
        <Button type="button" onClick={() => setAllPostsInDatabase([])}>
          Clear
        </Button>
      </GridContainer>
    </Article>
  );
};

export default GetAllPosts;

/* styles unchanged */
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

const GridContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
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
