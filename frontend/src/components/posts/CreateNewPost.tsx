// frontend/src/components/posts/CreateNewPost.tsx

import React, { useState } from "react";
import styled from "styled-components";

import PostService from "../../utils/api/service/PostService";
import { useUserContext } from "../../utils/global/provider/UserProvider";
import { PrimaryButton } from "../CustomButtonComponent";


type Props = {
  onCreated?: () => void;
};

const CreateNewPost: React.FC<Props> = ({ onCreated }) => {
  const { user } = useUserContext();

  const [content, setContent] = useState("");
  const [status, setStatus] = useState<string>("");

  const submit = async () => {
    setStatus("");
    if (!content.trim()) {
      setStatus("Write something first 🙂");
      return;
    }

    try {
      await PostService.createPost({ content: content.trim() });
      setContent("");
      setStatus("Posted ✅");
      onCreated?.();
    } catch {
      setStatus("Failed to post ❌");
    }
  };

  return (
    <Composer>
      <Top>
        <Avatar src={user?.avatarUrl || "https://thispersondoesnotexist.com/image"} alt="Me" />
        <Name>{user?.username}</Name>
      </Top>

      <TextArea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <Row>
        <PrimaryButton onClick={submit}>Post</PrimaryButton>
      </Row>

      <Status>{status}</Status>
    </Composer>
  );
};

export default CreateNewPost;

const Composer = styled.div`
  display: grid;
  gap: 12px;
`;

const Top = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const Avatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--thirdly-color);
  object-fit: cover;
`;

const Name = styled.div`
  font-weight: 900;
  color: var(--secondary-color);
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 110px;
  border-radius: 12px;
  border: 1px solid rgba(97, 97, 97, 0.25);
  padding: 12px;
  font-size: 1rem;
  outline: none;
  resize: vertical;

  &:focus {
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 3px rgba(0, 0, 153, 0.12);
  }
`;

const Row = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Status = styled.div`
  min-height: 22px;
  font-weight: 800;
  color: var(--fourthly-color);
`;
