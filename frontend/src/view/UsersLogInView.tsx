// frontend/src/view/UsersLogInView.tsx

import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router-dom";
import styled from "styled-components";
import RoutingPath from "../routes/RoutingPath";
import AuthService from "../api/service/AuthService";
import { useUserContext } from "../provider/UserProvider";
import {
  PrimaryButton,
  SecondaryButton
} from "../components/CustomButtonComponent";
import FormInput from "../components/FormInput";


/**---------------------
    Styled-Components
------------------------*/
const Page = styled.main`
  background: ${({ theme }) => theme.colors.primary};
  min-height: calc(100vh - 85px);
  display: grid;
  place-items: center;
  padding: 30px 0;
`;

const Shell = styled.section`
  width: min(1100px, 92%);
  display: grid;
  grid-template-columns: 1fr 420px;
  gap: 40px;
  align-items: center;

  @media (max-width: 960px) {
    grid-template-columns: 1fr;
    gap: 18px;
  }
`;

const Left = styled.div`
  padding: 12px;
`;

const Brand = styled.h1`
  margin: 0;
  color: ${({ theme }) => theme.colors.text_primary};
  font-weight: 900;
  font-size: 3.2rem;
  font-family: "Oxygen - Regular", sans-serif;
`;

const Pitch = styled.p`
  margin: 10px 0 0;
  color: ${({ theme }) => theme.colors.text_secondary};
  font-size: 1.35rem;
  line-height: 1.3;
`;

const Right = styled.div`
  display: grid;
`;

const Card = styled.div`
  background: ${({ theme }) => theme.colors.fourthly};
  border: 1px solid rgba(97, 97, 97, 0.25);
  border-radius: 16px;
  box-shadow: ${({ theme }) => theme.colors.card_shadow};
  padding: 18px;
  display: grid;
  gap: 12px;
`;

const CardTitle = styled.h2`
  margin: 0 0 6px;
  color: ${({ theme }) => theme.colors.text_primary};
  font-size: 1.25rem;
  font-weight: 900;
`;

const ErrorText = styled.div`
  min-height: 22px;
  font-weight: 800;
  color: rgb(220, 38, 38);
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid rgba(97, 97, 97, 0.2);
  margin: 8px 0;
`;

// makes Link behave like a block wrapper without changing your button
const LinkBlock = styled(Link)`
  text-decoration: none;
  display: block;
`;

const UsersLogInView: React.FC = () => {
  const { token, setAuth } = useUserContext();
  const navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [loginText, setLoginText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (token) return <Navigate to={RoutingPath.homeView} replace />;

  const login = async () => {
    if (isSubmitting) return;

    setLoginText("");
    setIsSubmitting(true);

    try {
      const res = await AuthService.login({
        username: userName.trim(),
        password: passWord,
      });

      setAuth(res.data.token, res.data.user);
      navigate(RoutingPath.homeView, { replace: true });
    } catch (e: any) {
      const msg = e?.response?.data?.message || "Wrong username or password";
      setLoginText(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") login();
  };

  return (
    <Page>
      <Shell>
        <Left>
          <Brand>Bookface</Brand>
          <Pitch>Connect with friends and the world around you.</Pitch>
        </Left>

        <Right>
          <Card>
            <CardTitle>Log in</CardTitle>

            <FormInput
              name="username"
              label="Username or email"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              onKeyDown={onEnter}
              autoComplete="username"
              placeholder="Enter username or email"
              required
              disabled={isSubmitting}
            />

            <FormInput
              name="password"
              label="Password"
              type="password"
              value={passWord}
              onChange={(e) => setPassWord(e.target.value)}
              onKeyDown={onEnter}
              autoComplete="current-password"
              placeholder="Enter password"
              required
              disabled={isSubmitting}
            />

            <ErrorText role="alert">{loginText}</ErrorText>

            <PrimaryButton onClick={login} type="button" disabled={isSubmitting}>
              {isSubmitting ? "Logging in..." : "Log In"}
            </PrimaryButton>

            <Divider />

            {/* SecondaryButton doesn't accept `to`, so wrap with Link */}
            <LinkBlock to={RoutingPath.signUpFormView}>
              <SecondaryButton type="button">Create new account</SecondaryButton>
            </LinkBlock>
          </Card>
        </Right>
      </Shell>
    </Page>
  );
};

export default UsersLogInView;
