// frontend/src/view/HomeView.tsx

import React, { useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { Link, Navigate } from "react-router-dom";

import RoutingPath from "../routes/RoutingPath";
import { useUserContext } from "../utils/global/provider/UserProvider";
import FeedService from "../utils/api/service/FeedService";
import type { PostDTO } from "../utils/api/service/PostService";

import CreateNewPost from "../components/posts/CreateNewPost";


// ✅ local guard to handle "unknown" safely
const isAuthUser = (
  value: unknown
): value is { _id: string; username: string; avatarUrl?: string } => {
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
      const res = await FeedService.getFeed();
      setPosts(res.data);
    } catch {
      setPosts([]); // avoid infinite retries; show empty state
    } finally {
      setLoading(false);
    }
  }, []);

  // ✅ Fetch feed once after login/token becomes available
  useEffect(() => {
    if (!token) return;
    loadFeed();
  }, [token, loadFeed]);

  // ✅ redirect AFTER hooks
  if (!token) return <Navigate to={RoutingPath.usersLogInView} replace />;
  if (!me) return <Navigate to={RoutingPath.usersLogInView} replace />;

  return (
    <Page>
      <Shell>
        <LeftColumn>
          <Brand>
            <Logo>Bookface</Logo>
            <Tagline>Connect with friends and the world around you.</Tagline>
          </Brand>

          <UserCard>
            <Avatar
              src={me.avatarUrl || "https://thispersondoesnotexist.com/image"}
              alt="Avatar"
            />
            <div>
              <Name>{me.username}</Name>
              <MiniLinks>
                <Link to={RoutingPath.profileView}>Profile</Link>
                <span>·</span>
                <Link to={RoutingPath.settingsView}>Settings</Link>
              </MiniLinks>
            </div>
          </UserCard>
        </LeftColumn>

        <CenterColumn>
          <Card style={{ padding: 14 }}>
            <CreateNewPost onCreated={loadFeed} />
          </Card>

          <Card style={{ padding: 14, marginTop: 18 }}>
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
                    <PostAvatar
                      src={p.author?.avatarUrl || "https://thispersondoesnotexist.com/image"}
                      alt="Author"
                    />
                    <div>
                      <PostName>{p.author?.username ?? "Unknown"}</PostName>
                      <PostTime>{new Date(p.createdAt).toLocaleString()}</PostTime>
                    </div>
                  </PostTop>

                  <PostContent>{p.content}</PostContent>
                  {p.imageUrl ? <PostImage src={p.imageUrl} alt="Post media" /> : null}
                </PostCard>
              ))}

              {!loading && posts.length === 0 ? (
                <EmptyState>No posts yet. Create the first one ✨</EmptyState>
              ) : null}
            </FeedList>
          </Card>
        </CenterColumn>

        <RightColumn>
          <Card style={{ padding: 14 }}>
            <RightTitle>Tips</RightTitle>
            <RightText>Post something positive ✨</RightText>
          </Card>
        </RightColumn>
      </Shell>
    </Page>
  );
};

export default HomeView;

/* styles unchanged */
const Page = styled.main`
  background: var(--primary-color);
  min-height: calc(100vh - 85px);
  padding: 20px 0 60px;
`;

const Shell = styled.section`
  width: min(1200px, 92%);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 280px 1fr 280px;
  gap: 20px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const LeftColumn = styled.aside`
  @media (max-width: 960px) {
    order: 2;
  }
`;

const CenterColumn = styled.section`
  @media (max-width: 960px) {
    order: 1;
  }
`;

const RightColumn = styled.aside`
  @media (max-width: 960px) {
    order: 3;
  }
`;

const Card = styled.div`
  background: var(--fifthly-color);
  border: 1px solid rgba(97, 97, 97, 0.25);
  border-radius: 14px;
  box-shadow: 0 10px 24px rgba(97, 97, 97, 0.2);
`;

const Brand = styled.div`
  padding: 10px 6px 18px;
`;

const Logo = styled.h1`
  margin: 0;
  color: var(--secondary-color);
  font-weight: 800;
  font-size: 2.2rem;
  font-family: "Oxygen - Regular", sans-serif;
`;

const Tagline = styled.p`
  margin: 8px 0 0;
  color: var(--fourthly-color);
  font-size: 1rem;
`;

const UserCard = styled(Card)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 14px;
`;

const Avatar = styled.img`
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: 1px solid var(--thirdly-color);
  object-fit: cover;
`;

const Name = styled.div`
  font-weight: 800;
  color: var(--secondary-color);
  font-family: "Oleo Script", sans-serif;
  font-size: 1.2rem;
`;

const MiniLinks = styled.div`
  margin-top: 4px;
  display: flex;
  gap: 8px;
  align-items: center;

  a {
    color: var(--fourthly-color);
    text-decoration: none;
    font-weight: 700;
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
  font-size: 1.1rem;
  font-weight: 900;
`;

const Refresh = styled.button`
  border: 1px solid rgba(97, 97, 97, 0.25);
  background: white;
  border-radius: 10px;
  padding: 8px 12px;
  cursor: pointer;
  font-weight: 800;
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
  border-radius: 14px;
  padding: 12px;
`;

const PostTop = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

const PostAvatar = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  border: 1px solid var(--thirdly-color);
  object-fit: cover;
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
  line-height: 1.4;
  white-space: pre-wrap;
`;

const PostImage = styled.img`
  margin-top: 10px;
  width: 100%;
  border-radius: 12px;
  border: 1px solid rgba(97, 97, 97, 0.15);
`;

const RightTitle = styled.h3`
  margin: 0 0 8px;
  color: var(--fourthly-color);
  font-size: 1rem;
  font-weight: 900;
`;

const RightText = styled.p`
  margin: 0;
  color: var(--fourthly-color);
  line-height: 1.4;
`;

const EmptyState = styled.div`
  padding: 14px;
  text-align: center;
  color: var(--fourthly-color);
  font-weight: 800;
`;
