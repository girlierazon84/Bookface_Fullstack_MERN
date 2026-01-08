// frontend/src/components/posts/CreateNewPost.tsx

import React, { useState } from "react";
import styled from "styled-components";
import { TextField } from "@mui/material";
import { JsonToTable } from "react-json-to-table";

import { PrimaryButton } from "../CustomButtonComponent";
import PostService from "../../utils/api/service/PostService";
import type { CreatePostObject, PostDataObject } from "../../utils/interface/PostInterface";
import { useUserContext } from "../../utils/global/provider/UserProvider";


const CreateNewPost: React.FC = () => {
  const { authenticatedUser } = useUserContext();
  const imgUrl = "https://thispersondoesnotexist.com/image";

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [postObject, setPostObject] = useState<PostDataObject | null>(null);

  const createPost = async () => {
    const payload: CreatePostObject = {
      author: authenticatedUser || "anonymous",
      title,
      content
    };

    try {
      const res = await PostService.createPost(payload);
      setPostObject(res.data);
    } catch {
      setPostObject(null);
    }
  };

  const clearInputs = () => {
    setTitle("");
    setContent("");
    setPostObject(null);
  };

  return (
    <>
      <Article>
        <Header>
          <Img src={imgUrl} alt="Avatar" />
          <SpanUserName>{authenticatedUser}</SpanUserName>
        </Header>

        <FormArea>
          <TextField
            fullWidth
            variant="standard"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <TextArea
            placeholder="Write your post..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </FormArea>

        <ButtonRow>
          <PrimaryButton onClick={createPost}>Submit</PrimaryButton>
          <PrimaryButton onClick={clearInputs} type="reset">
            Clear
          </PrimaryButton>
        </ButtonRow>
      </Article>

      <Preview>
        <JsonToTable json={postObject ?? {}} />
      </Preview>
    </>
  );
};

export default CreateNewPost;

const Article = styled.article`
  padding: 2%;
  border: 1px solid var(--thirdly-color);
  box-shadow: 5px 10px 8px 5px var(--fourthly-color);
  border-radius: 1em;
  background-color: var(--thirdly-color);
  width: min(900px, 90%);
  margin: 2rem auto 0;
`;

const Header = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
`;

const Img = styled.img`
  border-radius: 50%;
  width: 3em;
  border: 1px solid var(--thirdly-color);
`;

const SpanUserName = styled.span`
  color: var(--secondary-color);
  font-size: 1em;
  font-weight: 600;
`;

const FormArea = styled.div`
  margin-top: 1.5rem;
  display: grid;
  gap: 16px;
`;

const TextArea = styled.textarea`
  background-color: inherit;
  width: 100%;
  padding: 1em;
  border-radius: 10px;
  font-size: 1em;
  border: 1px solid var(--fourthly-color);
  min-height: 140px;
`;

const ButtonRow = styled.div`
  margin-top: 1.5rem;
  display: grid;
  gap: 10px;
`;

const Preview = styled.article`
  width: min(900px, 90%);
  margin: 1rem auto 0;
`;
