// frontend/src/view/ProfileView.tsx

import React, {
  useCallback,
  useEffect,
  useMemo,
  useState
} from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { useUserContext } from "../provider/UserProvider";
import RoutingPath from "../routes/RoutingPath";
import postService, {
  type PostDTO,
  normalizePostsList
} from "../service/postService";
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

const Cover = styled.div`
  height: 170px;
  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.colors.secondary},
    ${({ theme }) => theme.colors.thirdly}
  );
`;

const HeaderRow = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 16px;
  margin-top: -34px;
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

/**-----------------------
    ProfileView
------------------------*/
const ProfileView: React.FC = () => {
  const { token, user } = useUserContext();
  const me = useMemo(() => (isAuthUser(user) ? user : null), [user]);

  const [posts, setPosts] = useState<PostDTO[]>([]);
  const [loading, setLoading] = useState(false);

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

  if (!token || !me) return <Navigate to={RoutingPath.usersLogInView} replace />;

  return (
    <Page>
      <Shell>
        <ProfileCard>
          <Cover />
          <HeaderRow>
            <Avatar src={me.avatarUrl} name={me.username} alt="Profile avatar" size={92} />
            <HeaderText>
              <Name>{me.username}</Name>
              <SubText>
                {me.bio?.trim()
                  ? me.bio
                  : "Welcome to your profile. Add a bio in Settings (PATCH /users/me)."}
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

                    {/* ✅ NEW backend structure: media[] (fallback to legacy imageUrl) */}
                    <PostMedia media={p.media} legacyImageUrl={p.imageUrl} />
                  </PostCard>
                ))}

                {!loading && posts.length === 0 ? (
                  <EmptyState>No posts yet. Share your first thought ✨</EmptyState>
                ) : null}
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
