// frontend/src/components/CreateNewPost.tsx

import React, { useRef, useState } from "react";
import styled from "styled-components";
import postService, { normalizeCreatedPost } from "../service/postService";
import { useUserContext } from "../provider/UserProvider";
import { PrimaryButton } from "./CustomButtonComponent";
import Avatar from "./Avatar";


/**----------------------
    Styled-components
-------------------------*/
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
`;

const MediaRow = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  align-items: center;
`;

const MediaHint = styled.div`
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text_secondary};
  font-size: 0.9rem;
`;

const BottomRow = styled.div`
  display: grid;
  gap: 10px;

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

type Props = {
  onCreated?: () => void | Promise<void>;
};

const MAX_FILES = 4;
const MAX_FILE_MB = 25;
const MAX_BYTES = MAX_FILE_MB * 1024 * 1024;

const isAllowedMime = (mime: string) => mime.startsWith("image/") || mime.startsWith("video/");

const CreateNewPost: React.FC<Props> = ({ onCreated }) => {
  const { user } = useUserContext();

  const [content, setContent] = useState("");
  const [status, setStatus] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);

  const [files, setFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const pickFiles = () => inputRef.current?.click();

  const onFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files ?? []);
    e.target.value = "";

    // filter invalid types
    const invalidType = list.find((f) => !isAllowedMime(f.type));
    if (invalidType) {
      setStatus("Only images/videos are allowed ❌");
      return;
    }

    // filter oversized
    const tooBig = list.find((f) => f.size > MAX_BYTES);
    if (tooBig) {
      setStatus(`File too large ❌ Max ${MAX_FILE_MB}MB per file.`);
      return;
    }

    const next = list.slice(0, MAX_FILES);
    setFiles(next);
    setStatus(next.length ? `${next.length} file(s) selected ✅` : "");
  };

  const submit = async () => {
    setStatus("");

    const trimmed = content.trim();
    if (!trimmed) {
      setStatus("Write something first 🙂");
      return;
    }

    if (submitting) return;

    // final safety check (in case files were set another way)
    const tooBig = files.find((f) => f.size > MAX_BYTES);
    if (tooBig) {
      setStatus(`File too large ❌ Max ${MAX_FILE_MB}MB per file.`);
      return;
    }

    setSubmitting(true);
    try {
      const res = await postService.createPost({ content: trimmed, files });
      const created = normalizeCreatedPost(res.data);
      if (!created) console.warn("Unexpected create post response shape:", res.data);

      setContent("");
      setFiles([]);
      setStatus("Posted ✅");
      await onCreated?.();
    } catch (e: any) {
      const msg =
        e?.response?.data?.message ||
        e?.message ||
        "Failed to post ❌";
      console.warn("Failed to create post:", e);
      setStatus(msg);
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

      <MediaRow>
        <input
          ref={inputRef}
          type="file"
          accept="image/*,video/*"
          multiple
          hidden
          onChange={onFilesSelected}
        />
        <PrimaryButton type="button" onClick={pickFiles} disabled={submitting}>
          Add media
        </PrimaryButton>
        <MediaHint>
          {files.length
            ? `${files.length} file(s) selected (max ${MAX_FILES}, ${MAX_FILE_MB}MB each)`
            : "Optional: images/videos"}
        </MediaHint>
      </MediaRow>

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
