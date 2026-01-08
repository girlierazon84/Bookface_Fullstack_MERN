// frontend/src/view/UsersLogInView.tsx

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

import { PrimaryButton } from "../components/CustomButtonComponent";
import RoutingPath from "../routes/RoutingPath";
import UserService from "../utils/api/service/UserService";
import { useUserContext } from "../utils/global/provider/UserProvider";
import type { UsersLogInDataObject } from "../utils/interface/UsersInterfaces";


const UsersLogInView: React.FC = () => {
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [loginText, setLoginText] = useState("");
  const { setAuthenticatedUser } = useUserContext();
  const navigate = useNavigate();

  const verifyUser = async () => {
    const payload: UsersLogInDataObject = {
      username: userName,
      password: passWord
    };

    try {
      const res = await UserService.verifyUser(payload);
      if (res.data.message) {
        setAuthenticatedUser(userName);
        localStorage.setItem("username", userName);
        navigate(RoutingPath.profileView);
      } else {
        setLoginText("Wrong username or password");
      }
    } catch {
      setLoginText("Login failed. Please try again.");
    }
  };

  return (
    <Wrapper>
      <h1>Bookface</h1>

      <GridContainer>
        <h4>Log in here...</h4>
        <input type="text" placeholder="Username" onChange={(e) => setUserName(e.target.value)} />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassWord(e.target.value)}
        />
      </GridContainer>

      <H3>{loginText}</H3>

      <PrimaryButton onClick={verifyUser}>Log In</PrimaryButton>

      <H4>
        No account yet? <Link to={RoutingPath.signUpFormView}>Sign Up</Link> here!
      </H4>
    </Wrapper>
  );
};

export default UsersLogInView;

const Wrapper = styled.section`
  background-color: var(--primary-color);
  text-align: center;
  padding: 5% 5% 20% 5%;

  h1 {
    font-weight: bold;
    font-size: 3.7em;
    font-family: "Oxygen - Regular", sans-serif;
    color: var(--secondary-color);
  }
`;

const GridContainer = styled.div`
  display: grid;
  background-color: var(--fifthly-color);
  border: 1px solid var(--fifthly-color);
  box-shadow: 5px 10px 8px 5px var(--fourthly-color);
  border-radius: 20px;
  padding: 0 2em 3.5em 2em;
  gap: 2.5em;

  h4 {
    color: var(--fourthly-color);
    font-family: "Lucida Calligraphy", sans-serif;
    font-weight: bold;
    width: 100%;
    text-align: left;
  }

  input {
    width: 100%;
    height: 48px;
    border: none;
    box-shadow: 2px 4px 3px 2px var(--fourthly-color);
    border-radius: 10px;
    padding-left: 20px;
    font-size: 1em;
  }
`;

const H3 = styled.h3`
  color: red;
  font-weight: bold;
  min-height: 24px;
  margin: 16px 0;
`;

const H4 = styled.h4`
  color: var(--fourthly-color);
  font-weight: 700;
  margin-top: 16px;
`;
