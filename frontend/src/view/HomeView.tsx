// frontend/src/view/HomeView.tsx

import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";

import RoutingPath from "../routes/RoutingPath";
import { useUserContext } from "../utils/global/provider/UserProvider";
import PostService, { type PostDTO, normalizePostsList } from "../utils/api/service/PostService";
import CreateNewPost from "../components/posts/CreateNewPost";
import Avatar from "../components/ui/Avatar";


const isAuthUser = (value: unknown): value is { _id: string; username: string; avatarUrl?: string } => {
  return !!value && typeof value === "object" && "_id" in (value as any) && "username" in (value as any);
};

const HomeView: React.FC = () => {
  const { token, user } = useUserContext();
  const me = useMemo(() => (isAuthUser(user) ? user : null), [user]);

  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const loadFeed = useCallback(async () => {
    setLoading(true);
    try {
      const res = await PostService.getFeed();
      const list = normalizePostsList(res.data);
      setPosts(list);
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

const Page = styled.main`
  background: var(--primary-color);
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
  background: var(--fifthly-color);
  border: 1px solid rgba(97, 97, 97, 0.25);
  border-radius: 16px;
  box-shadow: 0 10px 24px rgba(97, 97, 97, 0.18);
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
  color: var(--secondary-color);
  font-family: "Oleo Script", sans-serif;
  font-size: 1.2rem;
`;

const TopLinks = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;

  a {
    color: var(--fourthly-color);
    text-decoration: none;
    font-weight: 800;
  }

  a:hover {
    text-decoration: underline;
    color: var(--secondary-color);
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
  color: var(--fourthly-color);
  font-size: 1rem;
  font-weight: 900;
`;

const Refresh = styled.button`
  border: 1px solid rgba(97, 97, 97, 0.25);
  background: white;
  border-radius: 12px;
  padding: 10px 12px;
  cursor: pointer;
  font-weight: 900;
  color: var(--fourthly-color);

  &:hover {
    border-color: var(--secondary-color);
    color: var(--secondary-color);
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
  background: white;
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
  color: var(--secondary-color);
`;

const PostTime = styled.div`
  font-size: 0.85rem;
  color: var(--fourthly-color);
`;

const PostContent = styled.p`
  margin: 10px 0 0;
  color: var(--fourthly-color);
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
  color: var(--fourthly-color);
  font-size: 1rem;
  font-weight: 900;
`;

const RightText = styled.p`
  margin: 0;
  color: var(--fourthly-color);
  line-height: 1.4;
  font-weight: 700;
`;

const EmptyState = styled.div`
  padding: 14px;
  text-align: center;
  color: var(--fourthly-color);
  font-weight: 900;
`;
