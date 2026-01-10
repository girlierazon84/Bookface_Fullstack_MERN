// frontend/src/components/posts/CreateNewPost.tsx

import React, { useState } from "react";
import styled from "styled-components";
import PostService, { normalizeCreatedPost } from "../api/service/PostService";
import { useUserContext } from "../provider/UserProvider";
import { PrimaryButton } from "./CustomButtonComponent";
import Avatar from "./Avatar";


/**----------------------------------------
    Styled components for CreateNewPost
-------------------------------------------*/
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
  color: ${({ theme }) => theme.colors.text_primary};
`;

const Hint = styled.div`
  color: ${({ theme }) => theme.colors.text_secondary};
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
  background: ${({ theme }) => theme.colors.primary};

  &:focus {
    border-color: ${({ theme }) => theme.colors.text_secondary};
    box-shadow: ${({ theme }) => theme.colors.card_shadow};
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
  color: ${({ theme }) => theme.colors.text_primary};
`;

// Props type definition
type Props = {
  onCreated?: () => void | Promise<void>;
};

// CreateNewPost component definition export
const CreateNewPost: React.FC<Props> = ({ onCreated }) => {
  // Access user from context
  const { user } = useUserContext();

  // Local state for content, status message, and submission state
  const [content, setContent] = useState("");
  const [status, setStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  // Function to handle post submission
  const submit = async () => {
    // Reset status message
    setStatus("");

    // Trim content and validate
    const trimmed = content.trim();
    if (!trimmed) {
      // If content is empty, set status and return
      setStatus("Write something first 🙂");
      return;
    }
    // Prevent multiple submissions
    if (submitting) return;

    // Set submitting state to true
    setSubmitting(true);
    try {
      // Call PostService to create a new post
      const res = await PostService.createPost({ content: trimmed });
      const created = normalizeCreatedPost(res.data);
      if (!created) console.warn("Unexpected create post response shape:", res.data);

      // Clear content and set success status
      setContent("");
      setStatus("Posted ✅");
      await onCreated?.();
    } catch (e) {
      // Log error and set failure status
      console.warn("Failed to create post:", e);
      setStatus("Failed to post ❌");
    } finally {
      // Reset submitting state
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
