// frontend/src/components/NavigationBar.tsx

import React from "react";
import styled, { useTheme } from "styled-components";
import { Link, useLocation } from "react-router-dom";
import Burger from "./Burger";
import routingPath from "../routes/routingPath";
import logo from "../assets/logo.png";


const Nav = styled.nav`
  position: sticky;
  top: 0;
  z-index: 50;

  width: 100%;
  border-bottom: 1px solid rgba(97, 97, 97, 0.18);

  background: ${({ theme }) => theme.colors.fourthly};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const Inner = styled.div`
  height: 72px;
  width: min(1100px, 92%);
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  min-width: 0;
`;

const HomeLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  color: inherit;
`;

const LogoTile = styled.span`
  display: grid;
  place-items: center;

  img {
    width: 44px;
    height: 44px;
    object-fit: contain;
    display: block;
  }
`;

const WordmarkLink = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  line-height: 0;

  /* Nice focus ring */
  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.secondary};
    outline-offset: 4px;
    border-radius: 10px;
  }
`;

const WordmarkImg = styled.img`
  height: 34px;
  width: auto;
  display: block;

  /* prevent layout jump if slow */
  min-width: 120px;

  @media (max-width: 520px) {
    height: 30px;
    min-width: 100px;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

/** -----------------------
 * Helpers
 * ---------------------- */
const toHexNoHash = (color: unknown, fallback: string) => {
  if (typeof color !== "string") return fallback;

  // Accept "#RRGGBB" or "RRGGBB"
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
    // if URL parsing fails for any reason, return original
    return url;
  }
};

const NavigationBar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();
  const theme = useTheme() as any;

  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Your FontSpace wordmark
  const baseWordmark =
    "https://see.fontimg.com/api/rf5/OV9ee/MmRkOTg0YTA5Y2U4NDcxMDg4MmM2NWVlNzE2MzgyM2UudHRm/Qm9va0ZhY2U/lucy-said-ok-personal-use-italic.png?r=fs&h=98&w=1500&fg=000000&bg=FFFFFF&tb=1&s=65";

  // Make it match theme colors (best effort: works great if your theme uses hex colors)
  const fg = toHexNoHash(theme?.colors?.secondary, "000000");
  const bg = toHexNoHash(theme?.colors?.fourthly, "FFFFFF");

  const wordmarkSrc = React.useMemo(() => {
    let u = baseWordmark;
    u = setQueryParam(u, "fg", fg);
    u = setQueryParam(u, "bg", bg);
    return u;
  }, [fg, bg]);

  return (
    <Nav>
      <Inner>
        <Left>
          {/* Home logo link */}
          <HomeLink to={routingPath.homeView} aria-label="Go to home">
            <LogoTile aria-hidden="true">
              <img src={logo} alt="" />
            </LogoTile>
          </HomeLink>

          {/* External wordmark link (NOT nested inside <Link>) */}
          <WordmarkLink
            href="https://www.fontspace.com/category/calligraphy"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Font credit: FontSpace (opens in a new tab)"
            title="Font credit: FontSpace"
          >
            <WordmarkImg src={wordmarkSrc} alt="BookFace wordmark" />
          </WordmarkLink>
        </Left>

        <Right>
          <Burger open={open} setOpen={setOpen} />
        </Right>
      </Inner>
    </Nav>
  );
};

export default NavigationBar;
