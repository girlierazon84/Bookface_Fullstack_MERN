// frontend/src/view/ProfileView.tsx

import React, { useCallback, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";

import { useUserContext } from "../utils/global/provider/UserProvider";
import RoutingPath from "../routes/RoutingPath";
import PostService, { type PostDTO } from "../utils/api/service/PostService";
import CreateNewPost from "../components/posts/CreateNewPost";


const ProfileView: React.FC = () => {
  const { token, user } = useUserContext();

  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [loading, setLoading] = useState(false);

  const loadMyTimeline = useCallback(async () => {
    if (!token || !user) return;

    setLoading(true);
    try {
      const res = await PostService.getFeed();
      const mine = res.data.filter((p) => p.author?._id === user._id);
      setPosts(mine);
    } finally {
      setLoading(false);
    }
  }, [token, user]);

  useEffect(() => {
    if (!token || !user) return;
    loadMyTimeline();
  }, [token, user, loadMyTimeline]);

  // redirects AFTER hooks
  if (!token) return <Navigate to={RoutingPath.usersLogInView} replace />;
  if (!user) return <Navigate to={RoutingPath.homeView} replace />;

  return (
    <Page>
      <Shell>
        <ProfileCard>
          <Cover />

          <HeaderRow>
            <Avatar
              src={user.avatarUrl || "https://thispersondoesnotexist.com/image"}
              alt="Profile avatar"
            />
            <HeaderText>
              <Name>{user.username}</Name>
              <SubText>
                {user.bio?.trim()
                  ? user.bio
                  : "Welcome to your profile. Add a bio later (backend update endpoint coming soon)."}
              </SubText>
            </HeaderText>
          </HeaderRow>

          <ActionRow>
            <SmallPill>
              {user.firstname} {user.lastname}
            </SmallPill>
            {user.email ? <SmallPill>{user.email}</SmallPill> : null}
          </ActionRow>
        </ProfileCard>

        <Grid>
          <Left>
            <Card>
              <CardTitle>Intro</CardTitle>
              <Muted>This section can later show: city, school, relationship, friends count, etc.</Muted>
            </Card>
          </Left>

          <Center>
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
                      <PostAvatar
                        src={p.author?.avatarUrl || "https://thispersondoesnotexist.com/image"}
                        alt="Author"
                      />
                      <div>
                        <PostName>{p.author?.username}</PostName>
                        <PostTime>{new Date(p.createdAt).toLocaleString()}</PostTime>
                      </div>
                    </PostTop>

                    <PostContent>{p.content}</PostContent>

                    {p.imageUrl ? <PostImage src={p.imageUrl} alt="Post media" /> : null}
                  </PostCard>
                ))}

                {!loading && posts.length === 0 ? (
                  <EmptyState>No posts yet. Share your first thought ✨</EmptyState>
                ) : null}
              </FeedList>
            </Card>
          </Center>

          <Right>
            <Card>
              <CardTitle>Friends</CardTitle>
              <Muted>Coming soon: friends list + friend requests (backend FriendRequestModel).</Muted>
            </Card>
          </Right>
        </Grid>
      </Shell>
    </Page>
  );
};

export default ProfileView;

/* ---------- styles (same as yours) ---------- */

const Page = styled.main`
  background: var(--primary-color);
  min-height: calc(100vh - 85px);
  padding: 20px 0 60px;
`;

const Shell = styled.section`
  width: min(1100px, 92%);
  margin: 0 auto;
  display: grid;
  gap: 16px;
`;

const Grid = styled.section`
  display: grid;
  grid-template-columns: 280px 1fr 280px;
  gap: 16px;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
  }
`;

const Left = styled.aside`
  @media (max-width: 960px) {
    order: 2;
  }
`;

const Center = styled.section`
  @media (max-width: 960px) {
    order: 1;
  }
`;

const Right = styled.aside`
  @media (max-width: 960px) {
    order: 3;
  }
`;

const Card = styled.div`
  background: var(--fifthly-color);
  border: 1px solid rgba(97, 97, 97, 0.25);
  border-radius: 14px;
  box-shadow: 0 10px 24px rgba(97, 97, 97, 0.2);
  padding: 14px;
`;

const ProfileCard = styled.div`
  background: var(--fifthly-color);
  border: 1px solid rgba(97, 97, 97, 0.25);
  border-radius: 16px;
  box-shadow: 0 10px 24px rgba(97, 97, 97, 0.25);
  overflow: hidden;
`;

const Cover = styled.div`
  height: 180px;
  background: linear-gradient(135deg, var(--secondary-color), var(--thirdly-color));
`;

const HeaderRow = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 16px;
  margin-top: -38px;
`;

const Avatar = styled.img`
  width: 92px;
  height: 92px;
  border-radius: 50%;
  border: 4px solid var(--fifthly-color);
  object-fit: cover;
`;

const HeaderText = styled.div`
  display: grid;
  gap: 6px;
`;

const Name = styled.h1`
  margin: 0;
  color: var(--secondary-color);
  font-weight: 900;
  font-family: "Oleo Script", sans-serif;
`;

const SubText = styled.p`
  margin: 0;
  color: var(--fourthly-color);
  font-weight: 700;
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0 16px 16px;
`;

const SmallPill = styled.span`
  background: white;
  border: 1px solid rgba(97, 97, 97, 0.2);
  padding: 8px 10px;
  border-radius: 999px;
  font-weight: 800;
  color: var(--fourthly-color);
`;

const CardTitle = styled.h2`
  margin: 0 0 10px;
  color: var(--fourthly-color);
  font-size: 1rem;
  font-weight: 900;
`;

const Muted = styled.p`
  margin: 0;
  color: var(--fourthly-color);
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

const EmptyState = styled.div`
  padding: 14px;
  text-align: center;
  color: var(--fourthly-color);
  font-weight: 800;
`;
/* ---------- end styles ---------- */