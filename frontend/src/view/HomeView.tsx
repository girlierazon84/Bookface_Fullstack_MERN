// frontend/src/view/HomeView.tsx

import React from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";
import RoutingPath from "../routes/RoutingPath";


const HomeView: React.FC = () => {
  return (
    <Article>
      <h1>Welcome!</h1>
      <h2>Bookface</h2>
      <p>Det är vårt slutprojekt med MERN stack, TypeScript och Bcrypt.</p>

      <GridContainer>
        <Button>
          <Link to={RoutingPath.usersLogInView}>Log In</Link>
        </Button>

        <h3>OR</h3>

        <Button>
          <Link to={RoutingPath.signUpFormView}>Sign Up</Link>
        </Button>
      </GridContainer>
    </Article>
  );
};

export default HomeView;

const fadeInAnimation = keyframes`
  from { opacity: 0 }
  to { opacity: 1 }
`;

const Article = styled.article`
  background-color: var(--primary-color);
  padding: 2rem 0 18rem 0;

  h1 {
    font-size: 3.8em;
    font-weight: bold;
    font-family: "Lucida Calligraphy", sans-serif;
    color: var(--fourthly-color);
    text-align: center;
    animation: ${fadeInAnimation} 0.8s ease-out;
  }

  h2 {
    font-size: 3em;
    padding-top: 1.5em;
    color: var(--secondary-color);
    font-family: "Oleo Script", sans-serif;
    font-weight: 700;
    text-align: center;
  }

  p {
    font-size: 1.2em;
    color: var(--fourthly-color);
    font-family: "Oxygen - Regular", sans-serif;
    text-align: center;
    padding: 0 1rem;
  }
`;

const GridContainer = styled.div`
  background-color: var(--fifthly-color);
  border-radius: 20px;
  display: grid;
  gap: 16px;
  width: min(700px, 92%);
  text-align: center;
  margin: 2rem auto 0;
  padding: 2rem 1rem;

  h3 {
    font-family: "Lucida Calligraphy", sans-serif;
    font-size: 2em;
    color: var(--fourthly-color);
    margin: 0;
  }
`;

const Button = styled.button`
  background-color: var(--secondary-color);
  border: 2px solid var(--fifthly-color);
  border-radius: 10px;
  box-shadow: 1.5px 2px 1.5px 2px var(--fourthly-color);
  padding: 1.25em;
  width: 90%;
  margin: 0 auto;
  cursor: pointer;

  &:hover {
    background-color: var(--fourthly-color);
  }

  a {
    color: var(--fifthly-color);
    text-decoration: none;
    text-transform: uppercase;
    font-size: 150%;
    font-weight: bold;
  }
`;
