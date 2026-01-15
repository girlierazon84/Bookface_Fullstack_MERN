// frontend/src/view/HomeView.tsx

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import RoutingPath from "../routes/routingPath";
import { useUserContext } from "../provider/UserProvider";
import PostService, {
  type PostDTO,
  normalizePostsList
} from "../service/postService";
import CreateNewPost from "../components/CreateNewPost";
import Avatar from "../components/Avatar";
import PostMedia from "../components/PostMedia";


/**--------------------------------
    Styled components
-----------------------------------*/
const Page = styled.main`
  background: ${({ theme }) => theme.colors.primary};
  min-height: calc(100vh - 85px);
  padding: 14px 0 calc(60px + env(safe-area-inset-bottom));
  width: 100%;
  overflow-x: clip;

  @supports not (overflow: clip) {
    overflow-x: hidden;
  }
`;

const Shell = styled.section`
  width: min(1100px, 92%);
  margin: 0 auto;
  display: grid;
  gap: 12px;
  min-width: 0;

  @media (min-width: 1024px) {
    grid-template-columns: minmax(0, 1fr) 340px;
    align-items: start;
    gap: 16px;
  }
`;

const MainCol = styled.div`
  display: grid;
  gap: 12px;
  min-width: 0;
`;

const SideCol = styled.aside`
  display: grid;
  gap: 12px;
  min-width: 0;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.fourthly};
  border: 1px solid rgba(97, 97, 97, 0.25);
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.colors.card_shadow};
  padding: 14px;
  min-width: 0;
`;

const TopCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
`;

const TopInfo = styled.div`
  display: grid;
  gap: 6px;
  min-width: 0;
`;

const TopName = styled.div`
  font-weight: 900;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: "Oleo Script", sans-serif;
  font-size: 1.25rem;
`;

const TopLinks = styled.nav`
  display: flex;
  gap: 10px;
  align-items: center;
  color: ${({ theme }) => theme.colors.text_secondary};
  min-width: 0;

  a {
    color: ${({ theme }) => theme.colors.text_secondary};
    text-decoration: none;
    font-weight: 800;
  }

  a:hover {
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: underline;
  }
`;

const FeedHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
  min-width: 0;
`;

const FeedTitle = styled.h2`
  margin: 0;
  color: ${({ theme }) => theme.colors.text_primary};
  font-size: 1rem;
  font-weight: 900;
`;

const Refresh = styled.button`
  border: 1px solid rgba(97, 97, 97, 0.25);
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 12px;
  padding: 10px 12px;
  cursor: pointer;
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text_primary};
  white-space: nowrap;

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const FeedList = styled.div`
  display: grid;
  gap: 12px;
  min-width: 0;
`;

const PostCard = styled.article`
  background: ${({ theme }) => theme.colors.primary};
  border: 1px solid rgba(97, 97, 97, 0.15);
  border-radius: 16px;
  padding: 12px;
  min-width: 0;
`;

const PostTop = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  min-width: 0;
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
  word-break: break-word;
`;

const RightTitle = styled.h3`
  margin: 0 0 6px;
  color: ${({ theme }) => theme.colors.text_primary};
  font-size: 1rem;
  font-weight: 900;
`;

const RightText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text_secondary};
  line-height: 1.4;
  font-weight: 700;
`;

const EmptyState = styled.div`
  padding: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text_secondary};
  font-weight: 900;
`;

const LoadingState = styled.div`
  padding: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.text_secondary};
  font-weight: 900;
`;

/**--------------------------------
    Types/helpers
-----------------------------------*/
type AuthUser = { _id: string; username: string; avatarUrl?: string };

const isAuthUser = (value: unknown): value is AuthUser => {
  if (!value || typeof value !== "object") return false;
  const v = value as Record<string, unknown>;
  return typeof v._id === "string" && typeof v.username === "string";
};

/**--------------------------------
    HomeView
-----------------------------------*/
const HomeView: React.FC = () => {
  const { token, user } = useUserContext();
  const me = useMemo(() => (isAuthUser(user) ? user : null), [user]);

  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const loadFeed = useCallback(async () => {
    setLoading(true);
    try {
      const res = await PostService.getFeed();
      setPosts(normalizePostsList(res.data));
    } catch (e) {
      console.warn("Failed to load feed", e);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!token) return;
    loadFeed();
  }, [token, loadFeed]);

  if (!token || !me) return <Navigate to={RoutingPath.usersLogInView} replace />;

  return (
    <Page>
      <Shell>
        <MainCol>
          <Card>
            <CreateNewPost onCreated={loadFeed} />
          </Card>

          <Card>
            <FeedHeader>
              <FeedTitle>Feed</FeedTitle>
              <Refresh onClick={loadFeed} type="button" disabled={loading}>
                {loading ? "Loading..." : "Refresh"}
              </Refresh>
            </FeedHeader>

            <FeedList>
              {loading && posts.length === 0 ? <LoadingState>Loading posts…</LoadingState> : null}

              {posts.map((p) => (
                <PostCard key={p._id}>
                  <PostTop>
                    <Avatar src={p.author?.avatarUrl} name={p.author?.username} alt="Author" size={40} />
                    <div>
                      <PostName>{p.author?.username ?? "Unknown"}</PostName>
                      <PostTime>{new Date(p.createdAt).toLocaleString()}</PostTime>
                    </div>
                  </PostTop>

                  <PostContent>{p.content}</PostContent>

                  {/* ✅ NEW backend structure: media[] (fallback to legacy imageUrl) */}
                  <PostMedia media={p.media} legacyImageUrl={p.imageUrl} />
                </PostCard>
              ))}

              {!loading && posts.length === 0 ? <EmptyState>No posts yet. Create the first one ✨</EmptyState> : null}
            </FeedList>
          </Card>
        </MainCol>

        <SideCol>
          <TopCard>
            <Avatar src={me.avatarUrl} name={me.username} alt="Avatar" size={44} />
            <TopInfo>
              <TopName>{me.username}</TopName>
              <TopLinks aria-label="Quick links">
                <Link to={RoutingPath.profileView}>Profile</Link>
                <span aria-hidden="true">·</span>
                <Link to={RoutingPath.settingsView}>Settings</Link>
              </TopLinks>
            </TopInfo>
          </TopCard>

          <Card>
            <RightTitle>Tips</RightTitle>
            <RightText>Post something positive ✨</RightText>
          </Card>
        </SideCol>
      </Shell>
    </Page>
  );
};

export default HomeView;
