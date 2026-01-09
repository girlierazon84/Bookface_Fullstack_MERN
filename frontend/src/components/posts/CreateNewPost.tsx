// frontend/src/components/posts/CreateNewPost.tsx

import React, { useState } from "react";
import styled from "styled-components";

import PostService, { normalizeCreatedPost } from "../../utils/api/service/PostService";
import { useUserContext } from "../../utils/global/provider/UserProvider";
import { PrimaryButton } from "../CustomButtonComponent";
import Avatar from "../ui/Avatar";


type Props = {
  onCreated?: () => void | Promise<void>;
};

const CreateNewPost: React.FC<Props> = ({ onCreated }) => {
  const { user } = useUserContext();

  const [content, setContent] = useState("");
  const [status, setStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const submit = async () => {
    setStatus("");

    const trimmed = content.trim();
    if (!trimmed) {
      setStatus("Write something first 🙂");
      return;
    }
    if (submitting) return;

    setSubmitting(true);
    try {
      const res = await PostService.createPost({ content: trimmed });
      const created = normalizeCreatedPost(res.data);
      if (!created) console.warn("Unexpected create post response shape:", res.data);

      setContent("");
      setStatus("Posted ✅");
      await onCreated?.();
    } catch (e) {
      console.warn("Failed to create post:", e);
      setStatus("Failed to post ❌");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Composer>
      <Top>
        <Avatar src={user?.avatarUrl} name={user?.username} alt="Me" size={40} />
        <TopText>
          <Name>{user?.username ?? "Me"}</Name>
          <Hint>Share something with your friends</Hint>
        </TopText>
      </Top>

      <TextArea
        placeholder="What's on your mind?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={submitting}
      />

      <BottomRow>
        <Status aria-live="polite">{status}</Status>
        <PrimaryButton onClick={submit} disabled={submitting}>
          {submitting ? "Posting..." : "Post"}
        </PrimaryButton>
      </BottomRow>
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

const TopText = styled.div`
  display: grid;
  gap: 2px;
`;

const Name = styled.div`
  font-weight: 900;
  color: var(--secondary-color);
`;

const Hint = styled.div`
  color: var(--fourthly-color);
  font-weight: 700;
  font-size: 0.9rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 110px;
  border-radius: 16px;
  border: 1px solid rgba(97, 97, 97, 0.25);
  padding: 12px;
  font-size: 1rem;
  outline: none;
  resize: vertical;
  background: #fff;

  &:focus {
    border-color: var(--secondary-color);
    box-shadow: 0 0 0 3px rgba(0, 0, 153, 0.12);
  }

  &:disabled {
    opacity: 0.85;
    cursor: not-allowed;
  }
`;

const BottomRow = styled.div`
  display: grid;
  gap: 10px;

  /* mobile-first: button full width, status above */
  @media (min-width: 640px) {
    grid-template-columns: 1fr 160px;
    align-items: center;
  }
`;

const Status = styled.div`
  min-height: 18px;
  font-weight: 800;
  color: var(--fourthly-color);
`;
