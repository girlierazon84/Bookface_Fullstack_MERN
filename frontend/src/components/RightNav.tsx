// frontend/src/components/RightNav.tsx

import React from "react";
import styled from "styled-components";
import { Link, useLocation, useNavigate } from "react-router-dom";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import PostAddSharpIcon from "@mui/icons-material/PostAddSharp";
import Avatar from "./Avatar";
import { useUserContext } from "../provider/UserProvider";
import routingPath from "../routes/routingPath";


/** ----------------------------
 * Hook: media query (typed)
 * ---------------------------- */
const useMediaQuery = (query: string) => {
  const getMatches = () => (typeof window !== "undefined" ? window.matchMedia(query).matches : false);
  const [matches, setMatches] = React.useState<boolean>(getMatches);

  React.useEffect(() => {
    if (typeof window === "undefined") return;

    const mql: MediaQueryList = window.matchMedia(query);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);

    if (typeof mql.addEventListener === "function") {
      mql.addEventListener("change", onChange);
      setMatches(mql.matches);
      return () => mql.removeEventListener("change", onChange);
    }

    const legacyOnChange = () => setMatches(mql.matches);
    mql.addListener(legacyOnChange);
    setMatches(mql.matches);
    return () => mql.removeListener(legacyOnChange);
  }, [query]);

  return matches;
};

const NAVBAR_HEIGHT = 72;

const Overlay = styled.aside<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 60;

  display: grid;
  grid-template-columns: 1fr auto;

  background: rgba(0, 0, 0, ${({ $open }) => ($open ? 0.4 : 0)});
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: background 0.18s ease;

  @media (min-width: 769px) {
    position: static;
    inset: unset;
    display: block;
    background: transparent;
    pointer-events: auto;
    transition: none;
  }
`;

const Drawer = styled.div<{ $open: boolean }>`
  width: min(88vw, 380px);
  height: 100%;
  background: ${({ theme }) => theme.colors.fourthly};
  border-left: 1px solid rgba(97, 97, 97, 0.18);
  box-shadow: ${({ theme }) => theme.colors.card_shadow};

  display: grid;
  grid-template-rows: auto 1fr;

  transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
  transition: transform 0.22s ease;

  /* ✅ Make drawer feel aligned with navbar (burger line) */
  padding-top: ${NAVBAR_HEIGHT}px;

  @media (min-width: 769px) {
    height: auto;
    width: auto;
    border-left: none;
    box-shadow: none;
    background: transparent;
    transform: none;
    transition: none;
    padding-top: 0;
    display: block;
  }
`;

const UserHeader = styled.div`
  display: grid;
  gap: 10px;
  padding: 14px 16px;
  border-bottom: 1px solid rgba(97, 97, 97, 0.18);

  @media (min-width: 769px) {
    display: none;
  }
`;

const UserRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const UserText = styled.div`
  min-width: 0;
  display: grid;
  gap: 2px;
`;

const UserName = styled.div`
  font-weight: 900;
  color: ${({ theme }) => theme.colors.text_primary};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const UserMeta = styled.div`
  font-weight: 700;
  color: ${({ theme }) => theme.colors.text_secondary};
  font-size: 0.9rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Section = styled.div`
  padding: 14px;
  display: grid;
  gap: 10px;
  align-content: start;

  @media (min-width: 769px) {
    padding: 0;
    display: block;
  }
`;

const Menu = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;

  display: grid;
  gap: 10px;

  @media (min-width: 769px) {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const Item = styled.li`
  display: flex;
`;

const NavButton = styled(Link)<{ $active?: boolean }>`
  width: 100%;
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;

  padding: 12px 12px;
  border-radius: 14px;

  font-weight: 900;
  color: ${({ theme }) => theme.colors.text_primary};

  background: ${({ theme, $active }) => ($active ? theme.colors.primary : "transparent")};
  border: 1px solid rgba(97, 97, 97, ${({ $active }) => ($active ? 0.22 : 0.16)});

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};
    background: ${({ theme }) => theme.colors.primary};
  }

  @media (min-width: 769px) {
    width: auto;
    border: 1px solid transparent;
    background: transparent;

    &:hover {
      border: 1px solid rgba(97, 97, 97, 0.18);
      background: ${({ theme }) => theme.colors.primary};
    }
  }
`;

const ButtonIcon = styled.span`
  display: grid;
  place-items: center;
`;

const Hr = styled.hr`
  border: none;
  border-top: 1px solid rgba(97, 97, 97, 0.18);
  margin: 6px 0;

  @media (min-width: 769px) {
    display: none;
  }
`;

const ActionBtn = styled.button`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  border-radius: 14px;
  padding: 12px 12px;

  font-weight: 900;
  cursor: pointer;

  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.text_primary};
  border: 1px solid rgba(97, 97, 97, 0.18);

  &:hover {
    border-color: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.secondary};
  }

  @media (min-width: 769px) {
    width: auto;
    padding: 10px 12px;
  }
`;

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const RightNav: React.FC<Props> = ({ open, setOpen }) => {
  const { token, user, logout } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();

  const isMobile = useMediaQuery("(max-width: 768px)");

  const close = React.useCallback(() => setOpen(false), [setOpen]);
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  const isActive = (path: string) => location.pathname === path;

  const doLogout = () => {
    logout();
    close();
    navigate(routingPath.usersLogInView, { replace: true });
  };

  // ✅ Fully hide on mobile when closed
  if (isMobile && !open) return null;

  return (
    <Overlay $open={open} aria-hidden={!open} onClick={close}>
      <Drawer $open={open} onClick={stop} role="navigation" aria-label="Primary navigation">
        <div>
          <UserHeader>
            {token ? (
              <UserRow>
                <Avatar src={user?.avatarUrl} name={user?.username} alt="Profile avatar" size={44} />
                <UserText>
                  <UserName>{user?.username ?? "Me"}</UserName>
                  <UserMeta>{user?.email ?? "Signed in"}</UserMeta>
                </UserText>
              </UserRow>
            ) : (
              <UserRow>
                <Avatar src={null} name="Guest" alt="Guest" size={44} />
                <UserText>
                  <UserName>Guest</UserName>
                  <UserMeta>Log in to post & customize</UserMeta>
                </UserText>
              </UserRow>
            )}
          </UserHeader>

          <Section>
            <Menu id="primary-navigation">
              <Item>
                <NavButton to={routingPath.homeView} onClick={close} $active={isActive(routingPath.homeView)}>
                  <ButtonIcon>
                    <HomeSharpIcon fontSize="medium" />
                  </ButtonIcon>
                  Home
                </NavButton>
              </Item>

              {token ? (
                <>
                  <Item>
                    <NavButton
                      to={routingPath.createPostView}
                      onClick={close}
                      $active={isActive(routingPath.createPostView)}
                    >
                      <ButtonIcon>
                        <PostAddSharpIcon fontSize="medium" />
                      </ButtonIcon>
                      Create post
                    </NavButton>
                  </Item>

                  <Item>
                    <NavButton to={routingPath.profileView} onClick={close} $active={isActive(routingPath.profileView)}>
                      <ButtonIcon>
                        <PersonRoundedIcon fontSize="medium" />
                      </ButtonIcon>
                      Profile
                    </NavButton>
                  </Item>

                  <Item>
                    <NavButton to={routingPath.settingsView} onClick={close} $active={isActive(routingPath.settingsView)}>
                      <ButtonIcon>
                        <SettingsRoundedIcon fontSize="medium" />
                      </ButtonIcon>
                      Settings
                    </NavButton>
                  </Item>

                  <Hr />

                  <Item>
                    <ActionBtn type="button" onClick={doLogout} aria-label="Log out">
                      <LogoutRoundedIcon fontSize="small" />
                      Logout
                    </ActionBtn>
                  </Item>
                </>
              ) : (
                <Item>
                  <NavButton to={routingPath.usersLogInView} onClick={close} $active={isActive(routingPath.usersLogInView)}>
                    <ButtonIcon>
                      <LoginSharpIcon fontSize="medium" />
                    </ButtonIcon>
                    Log in
                  </NavButton>
                </Item>
              )}
            </Menu>
          </Section>
        </div>
      </Drawer>
    </Overlay>
  );
};

export default RightNav;
