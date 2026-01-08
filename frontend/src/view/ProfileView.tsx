// frontend/src/view/ProfileView.tsx

import React from "react";
import styled from "styled-components";
import { useUserContext } from "../utils/global/provider/UserProvider";


const ProfileView: React.FC = () => {
  const { authenticatedUser } = useUserContext();
  const imgUrl = "https://thispersondoesnotexist.com/image";

  return (
    <Article>
      <h1>My Profile</h1>

      <GridContainer>
        <Img src={imgUrl} alt="Profile avatar" />
        <SpanUserName>{authenticatedUser}</SpanUserName>
      </GridContainer>
    </Article>
  );
};

export default ProfileView;

const Article = styled.article`
  background-color: var(--primary-color);
  padding: 2rem 0 18rem 0;

  h1 {
    text-align: center;
    font-family: "Oleo Script", cursive;
    font-size: 3em;
    font-weight: 700;
    color: var(--fourthly-color);
  }
`;

const GridContainer = styled.div`
  display: grid;
  place-items: center;
  gap: 16px;
  margin-top: 2rem;
`;

const Img = styled.img`
  width: min(320px, 60vw);
  border: 1px solid var(--thirdly-color);
  border-radius: 10px;
`;

const SpanUserName = styled.span`
  color: var(--secondary-color);
  font-family: "Oleo Script", sans-serif;
  font-weight: bold;
  font-size: 1.5rem;
`;
