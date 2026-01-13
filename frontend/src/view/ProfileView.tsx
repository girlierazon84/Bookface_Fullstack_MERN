// frontend/src/view/ProfileView.tsx

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { useUserContext } from "../provider/UserProvider";
import routingPath from "../routes/routingPath";
import postService, {
  type PostDTO,
  normalizePostsList
} from "../service/postService";
import userService from "../service/userService";
import CreateNewPost from "../components/CreateNewPost";
import Avatar from "../components/Avatar";
import PostMedia from "../components/PostMedia";


/*-----------------------
    Styled Components
-------------------------*/
const Page = styled.main`
  background: ${({ theme }) => theme.colors.primary};
  min-height: calc(100vh - 85px);
  padding: 16px 0 calc(60px + env(safe-area-inset-bottom));
  overflow-x: hidden;
`;

const Shell = styled.section`
  width: min(1100px, 92%);
  margin: 0 auto;
  display: grid;
  gap: 16px;
  min-width: 0;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: 280px minmax(0, 1fr) 280px;
  gap: 16px;
  min-width: 0;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.fourthly};
  border: 1px solid rgba(97, 97, 97, 0.22);
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.colors.card_shadow};
  padding: 14px;
  min-width: 0;
`;

const ProfileCard = styled(Card)`
  padding: 0;
  overflow: hidden;
`;

const CoverBtn = styled.button<{ $src?: string }>`
  height: 170px;
  width: 100%;
  border: 0;
  cursor: pointer;
  display: block;
  padding: 0;

  background: ${({ $src, theme }) =>
    $src
      ? `url(${$src}) center/cover no-repeat`
      : `linear-gradient(135deg, ${theme.colors.secondary}, ${theme.colors.thirdly})`};

  position: relative;

  &:after {
    content: "Change cover";
    position: absolute;
    right: 12px;
    bottom: 12px;
    padding: 8px 10px;
    border-radius: 12px;
    font-weight: 900;
    color: ${({ theme }) => theme.colors.text_primary};
    background: rgba(0, 0, 0, 0.35);
    border: 1px solid rgba(255, 255, 255, 0.18);
  }
`;

const HeaderRow = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 16px;
  margin-top: -34px;
`;

const AvatarBtn = styled.button`
  border: 0;
  padding: 0;
  cursor: pointer;
  background: transparent;
  border-radius: 999px;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 4px;
  }
`;

const HeaderText = styled.div`
  display: grid;
  gap: 6px;
  min-width: 0;
`;

const Name = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.secondary};
  font-weight: 900;
  font-family: "Oleo Script", sans-serif;
  font-size: 1.6rem;
`;

const SubText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text_secondary};
  font-weight: 700;
  overflow-wrap: anywhere;
`;

const Pills = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 16px 16px;
`;

const Pill = styled.span`
  background: ${({ theme }) => theme.colors.primary};
  border: 1px solid rgba(97, 97, 97, 0.2);
  padding: 8px 10px;
  border-radius: 999px;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text_primary};
`;

const CardTitle = styled.h2`
  margin: 0 0 10px;
  color: ${({ theme }) => theme.colors.text_primary};
  font-size: 1rem;
  font-weight: 900;
`;

const Muted = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text_secondary};
  line-height: 1.4;
  font-weight: 700;
`;

const FeedHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
`;

const RefreshBtn = styled.button`
  border: 1px solid rgba(97, 97, 97, 0.25);
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  padding: 10px 12px;
  cursor: pointer;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text_primary};

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const FeedList = styled.div`
  display: grid;
  gap: 12px;
`;

const PostCard = styled.article`
  background: ${({ theme }) => theme.colors.primary};
  border: 1px solid rgba(97, 97, 97, 0.15);
  border-radius: 16px;
  padding: 12px;
`;

const PostTop = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const PostName = styled.div`
  font-weight: 900;
  color: ${({ theme }) => theme.colors.secondary};
`;

const PostTime = styled.div`
  font-size: 0.85rem;
  color: ${({ theme }) => theme.colors.text_secondary};
  font-weight: 700;
`;

const PostContent = styled.p`
  margin: 10px 0 0;
  color: ${({ theme }) => theme.colors.text_primary};
  line-height: 1.5;
  white-space: pre-wrap;
  font-weight: 700;
  overflow-wrap: anywhere;
`;

const EmptyState = styled.div`
  padding: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text_secondary};
  font-weight: 900;
`;

/**-----------------------
    Type guard
------------------------*/
const isAuthUser = (
  value: unknown
): value is {
  _id: string;
  username: string;
  firstname: string;
  lastname: string;
  email?: string;
  avatarUrl?: string;
  coverUrl?: string;
  bio?: string;
} => !!value && typeof value === "object" && "_id" in (value as any) && "username" in (value as any);

const ProfileView: React.FC = () => {
  const { token, user, setAuth } = useUserContext();
  const me = useMemo(() => (isAuthUser(user) ? user : null), [user]);

  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState<"avatar" | "cover" | null>(null);

  const avatarInputRef = useRef<HTMLInputElement | null>(null);
  const coverInputRef = useRef<HTMLInputElement | null>(null);

  const loadMyTimeline = useCallback(async () => {
    if (!token || !me) return;

    setLoading(true);
    try {
      const res = await postService.getFeed();
      const allPosts = normalizePostsList(res.data);
      setPosts(allPosts.filter((p) => p.author?._id === me._id));
    } catch {
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, [token, me]);

  useEffect(() => {
    loadMyTimeline();
  }, [loadMyTimeline]);

  const refreshMe = useCallback(async () => {
    if (!token) return;
    const res = await userService.me();
    // keep token, update user in storage/context
    setAuth(token, res.data as any);
  }, [token, setAuth]);

  const onPickAvatar = async (file?: File) => {
    if (!file) return;
    setUploading("avatar");
    try {
      await userService.uploadMyAvatar(file);
      await refreshMe();
    } finally {
      setUploading(null);
      if (avatarInputRef.current) avatarInputRef.current.value = "";
    }
  };

  const onPickCover = async (file?: File) => {
    if (!file) return;
    setUploading("cover");
    try {
      await userService.uploadMyCover(file);
      await refreshMe();
    } finally {
      setUploading(null);
      if (coverInputRef.current) coverInputRef.current.value = "";
    }
  };

  if (!token || !me) return <Navigate to={routingPath.usersLogInView} replace />;

  return (
    <Page>
      <Shell>
        <ProfileCard>
          <CoverBtn
            type="button"
            $src={me.coverUrl}
            onClick={() => coverInputRef.current?.click()}
            aria-label="Change cover photo"
          />
          <input
            ref={coverInputRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => onPickCover(e.target.files?.[0])}
          />

          <HeaderRow>
            <AvatarBtn type="button" onClick={() => avatarInputRef.current?.click()} aria-label="Change avatar">
              <Avatar src={me.avatarUrl} name={me.username} alt="Profile avatar" size={92} />
            </AvatarBtn>
            <input
              ref={avatarInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => onPickAvatar(e.target.files?.[0])}
            />

            <HeaderText>
              <Name>{me.username}</Name>
              <SubText>
                {uploading ? `Uploading ${uploading}…` : me.bio?.trim() ? me.bio : "Welcome to your profile. Add a bio in Settings."}
              </SubText>
            </HeaderText>
          </HeaderRow>

          <Pills>
            <Pill>
              {me.firstname} {me.lastname}
            </Pill>
            {me.email ? <Pill>{me.email}</Pill> : null}
          </Pills>
        </ProfileCard>

        <Grid>
          <Card>
            <CardTitle>Intro</CardTitle>
            <Muted>This section can later show: city, school, relationship, friends count, etc.</Muted>
          </Card>

          <div>
            <Card>
              <CardTitle>Create Post</CardTitle>
              <CreateNewPost onCreated={loadMyTimeline} />
            </Card>

            <Card style={{ marginTop: 16 }}>
              <FeedHeader>
                <CardTitle style={{ margin: 0 }}>Timeline</CardTitle>
                <RefreshBtn type="button" onClick={loadMyTimeline}>
                  {loading ? "Loading..." : "Refresh"}
                </RefreshBtn>
              </FeedHeader>

              <FeedList>
                {posts.map((p) => (
                  <PostCard key={p._id}>
                    <PostTop>
                      <Avatar src={p.author?.avatarUrl} name={p.author?.username} alt="Author" size={42} />
                      <div>
                        <PostName>{p.author?.username ?? "Unknown"}</PostName>
                        <PostTime>{new Date(p.createdAt).toLocaleString()}</PostTime>
                      </div>
                    </PostTop>

                    <PostContent>{p.content}</PostContent>
                    <PostMedia media={p.media} legacyImageUrl={p.imageUrl} />
                  </PostCard>
                ))}

                {!loading && posts.length === 0 ? <EmptyState>No posts yet. Share your first thought ✨</EmptyState> : null}
              </FeedList>
            </Card>
          </div>

          <Card>
            <CardTitle>Friends</CardTitle>
            <Muted>Coming soon: friends list + friend requests.</Muted>
          </Card>
        </Grid>
      </Shell>
    </Page>
  );
};

export default ProfileView;
