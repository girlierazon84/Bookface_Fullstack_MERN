// frontend/src/components/RightNav.tsx

import React from "react";
import styled, { useTheme } from "styled-components";
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
import logo from "../assets/logo.png";


/**-----------------------------
    Media query hook (typed)
--------------------------------*/
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

type AnchorPos = { right: number; bottom: number };

const Overlay = styled.aside<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 60;

  background: rgba(0, 0, 0, ${({ $open }) => ($open ? 0.4 : 0)});
  pointer-events: ${({ $open }) => ($open ? "auto" : "none")};
  transition: background 0.18s ease;

  @media (min-width: 769px) {
    position: static;
    inset: unset;
    background: transparent;
    pointer-events: auto;
    transition: none;
  }
`;

const FloatingPanel = styled.div<{ $open: boolean }>`
  position: fixed;
  z-index: 61;

  width: min(88vw, 380px);
  max-height: calc(100vh - 16px);
  overflow: auto;

  background: ${({ theme }) => theme.colors.fourthly};
  border: 1px solid rgba(97, 97, 97, 0.18);
  box-shadow: ${({ theme }) => theme.colors.card_shadow};
  border-radius: 18px;

  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transform: ${({ $open }) => ($open ? "translateY(0) scale(1)" : "translateY(-6px) scale(0.98)")};
  transform-origin: top right;
  transition: opacity 0.16s ease, transform 0.18s ease;

  @media (min-width: 769px) {
    position: static;
    width: auto;
    max-height: none;
    overflow: visible;
    border: none;
    box-shadow: none;
    border-radius: 0;
    opacity: 1;
    transform: none;
    transition: none;
  }
`;

const BrandHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  padding: 12px 14px;
  border-bottom: 1px solid rgba(97, 97, 97, 0.18);

  @media (min-width: 769px) {
    display: none;
  }
`;

const BrandLogo = styled.img`
  width: 42px;
  height: 42px;
  object-fit: contain;
  display: block;
`;

const WordmarkLink = styled.a`
  display: inline-flex;
  align-items: center;
  line-height: 0;
  text-decoration: none;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 4px;
    border-radius: 10px;
  }
`;

const WordmarkImg = styled.img`
  height: 28px;
  width: auto;
  display: block;
`;

const Section = styled.div`
  padding: 12px;
  display: grid;
  gap: 10px;

  @media (min-width: 769px) {
    padding: 0;
    display: block;
  }
`;

const UserHeader = styled.div`
  display: grid;
  gap: 10px;
  padding: 14px 14px 12px;
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

type Props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  anchorRef: React.RefObject<HTMLButtonElement>;
};

const RightNav: React.FC<Props> = ({ open, setOpen, anchorRef }) => {
  const { token, user, logout } = useUserContext();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme() as any;

  const isMobile = useMediaQuery("(max-width: 768px)");
  const [anchorPos, setAnchorPos] = React.useState<AnchorPos | null>(null);

  const close = React.useCallback(() => setOpen(false), [setOpen]);
  const stop = (e: React.MouseEvent) => e.stopPropagation();

  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  React.useLayoutEffect(() => {
    if (!isMobile || !open) return;

    const measure = () => {
      const el = anchorRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const right = Math.max(12, window.innerWidth - rect.right);
      const bottom = Math.max(8, rect.bottom);
      setAnchorPos({ right, bottom });
    };

    measure();

    window.addEventListener("resize", measure);
    window.addEventListener("scroll", measure, true);

    return () => {
      window.removeEventListener("resize", measure);
      window.removeEventListener("scroll", measure, true);
    };
  }, [isMobile, open, anchorRef]);

  const isActive = (path: string) => location.pathname === path;

  const doLogout = () => {
    logout();
    close();
    navigate(routingPath.usersLogInView, { replace: true });
  };

  // same wordmark as NavigationBar
  const baseWordmark =
    "https://see.fontimg.com/api/rf5/K74zp/ZjA0ZDIwYjE0YzZmNDIzYjkzNzA1ZTg1OTgwZGM3MTQudHRm/Qm9va0ZhY2U/motterdam.png?r=fs&h=98&w=1500&fg=000000&bg=FFFFFF&tb=1&s=65";

  const fg = toHexNoHash(theme?.colors?.secondary, "000000");
  const bg = toHexNoHash(theme?.colors?.fourthly, "FFFFFF");

  const wordmarkSrc = React.useMemo(() => {
    let u = baseWordmark;
    u = setQueryParam(u, "fg", fg);
    u = setQueryParam(u, "bg", bg);
    return u;
  }, [fg, bg]);

  if (isMobile && !open) return null;

  // Desktop inline
  if (!isMobile) {
    return (
      <nav aria-label="Primary navigation">
        <Menu id="primary-navigation">
          <Item>
            <NavButton to={routingPath.homeView} $active={isActive(routingPath.homeView)}>
              <ButtonIcon>
                <HomeSharpIcon fontSize="medium" />
              </ButtonIcon>
              Home
            </NavButton>
          </Item>

          {token ? (
            <>
              <Item>
                <NavButton to={routingPath.createPostView} $active={isActive(routingPath.createPostView)}>
                  <ButtonIcon>
                    <PostAddSharpIcon fontSize="medium" />
                  </ButtonIcon>
                  Create
                </NavButton>
              </Item>

              <Item>
                <NavButton to={routingPath.profileView} $active={isActive(routingPath.profileView)}>
                  <ButtonIcon>
                    <PersonRoundedIcon fontSize="medium" />
                  </ButtonIcon>
                  Profile
                </NavButton>
              </Item>

              <Item>
                <NavButton to={routingPath.settingsView} $active={isActive(routingPath.settingsView)}>
                  <ButtonIcon>
                    <SettingsRoundedIcon fontSize="medium" />
                  </ButtonIcon>
                  Settings
                </NavButton>
              </Item>

              <Item>
                <ActionBtn type="button" onClick={doLogout} aria-label="Log out">
                  <LogoutRoundedIcon fontSize="small" />
                  Logout
                </ActionBtn>
              </Item>
            </>
          ) : (
            <Item>
              <NavButton to={routingPath.usersLogInView} $active={isActive(routingPath.usersLogInView)}>
                <ButtonIcon>
                  <LoginSharpIcon fontSize="medium" />
                </ButtonIcon>
                Log in
              </NavButton>
            </Item>
          )}
        </Menu>
      </nav>
    );
  }

  // Mobile anchored popover
  const gap = 10;
  const panelTop = (anchorPos?.bottom ?? 72) + gap;

  return (
    <Overlay $open={open} aria-hidden={!open} onClick={close}>
      <FloatingPanel
        $open={open}
        onClick={stop}
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        style={{ top: panelTop, right: anchorPos?.right ?? 12 }}
      >
        {/* ✅ Same brand as NavigationBar */}
        <BrandHeader>
          <BrandLogo src={logo} alt="Bookface logo" />
          <WordmarkLink
            href="https://www.fontspace.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Font credit: FontSpace (opens in a new tab)"
            title="Font credit: FontSpace"
          >
            <WordmarkImg src={wordmarkSrc} alt="Bookface wordmark" />
          </WordmarkLink>
        </BrandHeader>

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
                  <NavButton to={routingPath.createPostView} onClick={close} $active={isActive(routingPath.createPostView)}>
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
      </FloatingPanel>
    </Overlay>
  );
};

export default RightNav;
