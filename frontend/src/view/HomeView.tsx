// frontend/src/view/HomeView.tsx

import React from "react";
import styled from "styled-components";
import { Navigate, Link } from "react-router-dom";

import RoutingPath from "../routes/RoutingPath";
import { useUserContext } from "../utils/global/provider/UserProvider";

// Feed widgets
import CreateNewPost from "../components/posts/CreateNewPost";
import GetAllPosts from "../components/posts/GetAllPosts";


const HomeView: React.FC = () => {
  const { authenticatedUser } = useUserContext();

  // Home should be visible ONLY after login
  if (!authenticatedUser) {
    return <Navigate to={RoutingPath.usersLogInView} replace />;
  }

  return (
    <Page>
      <Shell>
        <LeftColumn>
          <Brand>
            <Logo>Bookface</Logo>
            <Tagline>Connect with friends and the world around you.</Tagline>
          </Brand>

          <UserCard>
            <Avatar src="https://thispersondoesnotexist.com/image" alt="Avatar" />
            <div>
              <Name>{authenticatedUser}</Name>
              <MiniLinks>
                <Link to={RoutingPath.profileView}>Profile</Link>
                <span>·</span>
                <Link to={RoutingPath.settingsView}>Settings</Link>
              </MiniLinks>
            </div>
          </UserCard>
        </LeftColumn>

        <CenterColumn>
          <ComposerCard>
            <CreateNewPost />
          </ComposerCard>

          <FeedCard>
            <FeedTitle>Feed</FeedTitle>
            <GetAllPosts />
          </FeedCard>
        </CenterColumn>

        <RightColumn>
          <RightCard>
            <RightTitle>Tips</RightTitle>
            <RightText>
              Post something positive ✨
              <br />
              Keep it short and friendly.
            </RightText>
          </RightCard>
        </RightColumn>
      </Shell>
    </Page>
  );
};

export default HomeView;

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

const ComposerCard = styled(Card)`
  padding: 14px;
`;

const FeedCard = styled(Card)`
  margin-top: 18px;
  padding: 14px;
`;

const FeedTitle = styled.h2`
  margin: 0 0 10px;
  color: var(--fourthly-color);
  font-size: 1.1rem;
  font-weight: 900;
`;

const RightCard = styled(Card)`
  padding: 14px;
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
