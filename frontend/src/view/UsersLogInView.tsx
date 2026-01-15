// frontend/src/view/UsersLogInView.tsx

import React, { useMemo, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import RoutingPath from "../routes/routingPath";
import AuthService from "../service/authService";
import { useUserContext } from "../provider/UserProvider";
import { PrimaryButton, SecondaryButton } from "../components/CustomButtonComponent";
import FormInput from "../components/FormInput";
import logo from "../assets/logo.png";


/**--------------------
  Styled Components
-----------------------*/
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

const BrandRow = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 12px;
`;

const BrandLogo = styled.img`
  width: 56px;
  height: 56px;
  object-fit: contain;
  border-radius: 14px;
`;

const Wordmark = styled.img`
  height: 44px;
  width: auto;
  display: block;

  @media (max-width: 520px) {
    height: 38px;
  }
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

const LinkBlock = styled(Link)`
  text-decoration: none;
  display: block;
`;

/** ---------------------
 * Helpers (for FontImg)
 * --------------------- */
const toHexNoHash = (color: unknown, fallback: string) => {
  if (typeof color !== "string") return fallback;
  const raw = color.trim();
  const hex = raw.startsWith("#") ? raw.slice(1) : raw;
  if (/^[0-9a-fA-F]{6}$/.test(hex)) return hex.toUpperCase();
  return fallback;
};

const setQueryParam = (url: string, key: string, value: string) => {
  try {
    const u = new URL(url);
    u.searchParams.set(key, value);
    return u.toString();
  } catch {
    return url;
  }
};

const UsersLogInView: React.FC = () => {
  const { token, setAuth } = useUserContext();
  const navigate = useNavigate();
  const theme = useTheme() as any;

  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [loginText, setLoginText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // ✅ hooks + memo BEFORE any early return
  const baseWordmark =
    "https://see.fontimg.com/api/rf5/K74zp/ZjA0ZDIwYjE0YzZmNDIzYjkzNzA1ZTg1OTgwZGM3MTQudHRm/Qm9va0ZhY2U/motterdam.png?r=fs&h=98&w=1500&fg=000000&bg=FFFFFF&tb=1&s=65";

  const fg = toHexNoHash(theme?.colors?.secondary, "0000FF");
  const bg = toHexNoHash(theme?.colors?.primary, "FFFFFF");

  const wordmarkSrc = useMemo(() => {
    let u = baseWordmark;
    u = setQueryParam(u, "fg", fg);
    u = setQueryParam(u, "bg", bg);
    return u;
  }, [fg, bg]);

  // ✅ now safe to early return
  if (token) return <Navigate to={RoutingPath.homeView} replace />;

  const login = async () => {
    if (isSubmitting) return;

    setLoginText("");
    setIsSubmitting(true);

    try {
      // ✅ expect AuthResponse directly (not AxiosResponse)
      const res = await AuthService.login({
        username: userName.trim(),
        password: passWord
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
          <BrandRow>
            <BrandLogo src={logo} alt="Bookface logo" />
            <Wordmark src={wordmarkSrc} alt="Bookface wordmark" />
          </BrandRow>

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
