// frontend/src/view/HomeView.tsx

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";
import RoutingPath from "../routes/RoutingPath";
import { useUserContext } from "../provider/UserProvider";
import PostService, {
  type PostDTO,
  normalizePostsList
} from "../api/service/PostService";
import CreateNewPost from "../components/CreateNewPost";
import Avatar from "../components/Avatar";


/**--------------------------------
    Home view styled component.
-----------------------------------*/
const Page = styled.main`
  background: ${({ theme }) => theme.colors.primary};
  min-height: calc(100vh - 85px);
  padding: 14px 0 60px;
`;

const Shell = styled.section`
  width: min(720px, 92%);
  margin: 0 auto;
  display: grid;
  gap: 12px;

  /* desktop can expand */
  @media (min-width: 1024px) {
    width: min(1100px, 92%);
    grid-template-columns: 1fr 340px;
    align-items: start;

    /* feed column left, side column right */
    ${"" /* Put the feed/composer/top in left column via DOM order (works fine) */}
  }
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.fourthly};
  border: 1px solid rgba(97, 97, 97, 0.25);
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.colors.card_shadow};
  padding: 14px;
`;

const TopCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 14px;
`;

const TopInfo = styled.div`
  display: grid;
  gap: 4px;
`;

const TopName = styled.div`
  font-weight: 900;
  color: ${({ theme }) => theme.colors.secondary};
  font-family: "Oleo Script", sans-serif;
  font-size: 1.2rem;
`;

const TopLinks = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  a {
    color: ${({ theme }) => theme.colors.fourthly};
    text-decoration: none;
    font-weight: 800;
  }

  a:hover {
    text-decoration: underline;
    color: ${({ theme }) => theme.colors.secondary};
  }
`;

const FeedHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
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
  color: ${({ theme }) => theme.colors.fourthly};

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
`;

const PostCard = styled.div`
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
  color: ${({ theme }) => theme.colors.fourthly});
`;

const PostContent = styled.p`
  margin: 10px 0 0;
  color: ${({ theme }) => theme.colors.fourthly};
  line-height: 1.45;
  white-space: pre-wrap;
  font-weight: 700;
`;

const PostImage = styled.img`
  margin-top: 10px;
  width: 100%;
  border-radius: 14px;
  border: 1px solid rgba(97, 97, 97, 0.15);
`;

const RightTitle = styled.h3`
  margin: 0 0 6px;
  color: ${({ theme }) => theme.colors.fourthly};
  font-size: 1rem;
  font-weight: 900;
`;

const RightText = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.fourthly};
  line-height: 1.4;
  font-weight: 700;
`;

const EmptyState = styled.div`
  padding: 14px;
  text-align: center;
  color: ${({ theme }) => theme.colors.fourthly};
  font-weight: 900;
`;

// Type guard for authenticated user object from context
const isAuthUser = (value: unknown): value is { _id: string; username: string; avatarUrl?: string } => {
  // Check for required properties to identify an authenticated user object
  return !!value && typeof value === "object" && "_id" in (value as any) && "username" in (value as any);
};

// Home view component definition
const HomeView: React.FC = () => {
  // Get user context data (token and user) for authentication check and user info
  const { token, user } = useUserContext();
  const me = useMemo(() => (isAuthUser(user) ? user : null), [user]);

  // State for posts list and loading status
  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [loading, setLoading] = useState(false);

  // Function to load feed posts from API with error handling and loading state management
  const loadFeed = useCallback(async () => {
    // Set loading state to true before starting the API call
    setLoading(true);
    try {
      // Fetch feed posts from the PostService API and normalize the response data
      const res = await PostService.getFeed();
      const list = normalizePostsList(res.data);
      setPosts(list);
    } catch (e) {
      // Log any errors and set posts to an empty array on failure
      console.warn("Failed to load feed", e);
      setPosts([]);
    } finally {
      // Set loading state to false after the API call is completed (whether successful or failed)
      setLoading(false);
    }
  }, []);

  // useEffect to load feed posts when the component mounts or when the token changes
  useEffect(() => {
    // Only load feed if the user is authenticated (token exists)
    if (!token) return;
    loadFeed();
  }, [token, loadFeed]);

  // Redirect to login view if not authenticated
  if (!token) return <Navigate to={RoutingPath.usersLogInView} replace />;
  if (!me) return <Navigate to={RoutingPath.usersLogInView} replace />;

  return (
    <Page>
      <Shell>
        {/* Top user card (mobile-first) */}
        <TopCard>
          <Avatar src={me.avatarUrl} name={me.username} alt="Avatar" size={44} />
          <TopInfo>
            <TopName>{me.username}</TopName>
            <TopLinks>
              <Link to={RoutingPath.profileView}>Profile</Link>
              <span>·</span>
              <Link to={RoutingPath.settingsView}>Settings</Link>
            </TopLinks>
          </TopInfo>
        </TopCard>

        {/* Composer */}
        <Card>
          <CreateNewPost onCreated={loadFeed} />
        </Card>

        {/* Feed */}
        <Card>
          <FeedHeader>
            <FeedTitle>Feed</FeedTitle>
            <Refresh onClick={loadFeed} type="button" disabled={loading}>
              {loading ? "Loading..." : "Refresh"}
            </Refresh>
          </FeedHeader>

          <FeedList>
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

                {p.imageUrl ? <PostImage src={p.imageUrl} alt="Post media" /> : null}
              </PostCard>
            ))}

            {!loading && posts.length === 0 ? <EmptyState>No posts yet. Create the first one ✨</EmptyState> : null}
          </FeedList>
        </Card>

        {/* Tips card (bottom on mobile) */}
        <Card>
          <RightTitle>Tips</RightTitle>
          <RightText>Post something positive ✨</RightText>
        </Card>
      </Shell>
    </Page>
  );
};

export default HomeView;
