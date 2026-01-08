// frontend/src/view/ProfileView.tsx

import React from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";

import { useUserContext } from "../utils/global/provider/UserProvider";
import RoutingPath from "../routes/RoutingPath";


const ProfileView: React.FC = () => {
  const { authenticatedUser } = useUserContext();

  if (!authenticatedUser) {
    return <Navigate to={RoutingPath.usersLogInView} replace />;
  }

  return (
    <Page>
      <Card>
        <Cover />
        <ProfileRow>
          <Avatar src="https://thispersondoesnotexist.com/image" alt="Profile avatar" />
          <div>
            <Name>{authenticatedUser}</Name>
            <SmallText>Welcome to your profile.</SmallText>
          </div>
        </ProfileRow>

        <Section>
          <SectionTitle>About</SectionTitle>
          <SmallText>
            This is your Bookface profile page. You can add details later (bio, location, etc).
          </SmallText>
        </Section>
      </Card>
    </Page>
  );
};

export default ProfileView;

const Page = styled.main`
  background: var(--primary-color);
  min-height: calc(100vh - 85px);
  padding: 20px 0 60px;
  display: grid;
  place-items: start center;
`;

const Card = styled.section`
  width: min(900px, 92%);
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

const ProfileRow = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  padding: 16px;
  margin-top: -36px;
`;

const Avatar = styled.img`
  width: 84px;
  height: 84px;
  border-radius: 50%;
  border: 4px solid var(--fifthly-color);
  object-fit: cover;
`;

const Name = styled.h1`
  margin: 0;
  color: var(--secondary-color);
  font-weight: 900;
  font-family: "Oleo Script", sans-serif;
`;

const SmallText = styled.p`
  margin: 6px 0 0;
  color: var(--fourthly-color);
  font-weight: 700;
`;

const Section = styled.div`
  padding: 16px;
  border-top: 1px solid rgba(97, 97, 97, 0.2);
`;

const SectionTitle = styled.h2`
  margin: 0 0 8px;
  color: var(--fourthly-color);
  font-size: 1rem;
  font-weight: 900;
`;
