// frontend/src/components/FooterContainer.tsx

import React from "react";
import styled, { useTheme } from "styled-components";
import logo from "../assets/logo.png";
import CopyrightIcon from "@mui/icons-material/Copyright";


/**----------------------
    Styled-components
-------------------------*/
const Footer = styled.footer`
  width: 100%;
  border-top: 1px solid rgba(97, 97, 97, 0.2);
  background: ${({ theme }) => theme.colors.fourthly};
  padding: 14px 14px calc(14px + env(safe-area-inset-bottom));
`;

const Inner = styled.div`
  width: min(1100px, 92%);
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`;

const Brand = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;

  img {
    width: 52px;
    height: 52px;
    object-fit: contain;
    border-radius: 14px;
  }
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

  @media (max-width: 520px) {
    height: 26px;
  }
`;

const Meta = styled.div`
  display: grid;
  gap: 6px;
  text-align: center;

  @media (min-width: 768px) {
    text-align: right;
  }
`;

const Creator = styled.div`
  color: ${({ theme }) => theme.colors.text_primary};
  font-weight: 800;
`;

const Copy = styled.div`
  color: ${({ theme }) => theme.colors.text_secondary};
  font-weight: 800;
  opacity: 0.9;
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

export default function FooterContainer() {
  const theme = useTheme() as any;
  const year = new Date().getFullYear();

  const baseWordmark =
    "https://see.fontimg.com/api/rf5/K74zp/ZjA0ZDIwYjE0YzZmNDIzYjkzNzA1ZTg1OTgwZGM3MTQudHRm/Qm9va0ZhY2U/motterdam.png?r=fs&h=98&w=1500&fg=000000&bg=FFFFFF&tb=1&s=65";

  // ✅ Force wordmark text color to theme.secondary (blue)
  const fg = toHexNoHash(theme?.colors?.secondary, "0000FF");
  const bg = toHexNoHash(theme?.colors?.fourthly, "FFFFFF");

  const wordmarkSrc = React.useMemo(() => {
    let u = baseWordmark;
    u = setQueryParam(u, "fg", fg);
    u = setQueryParam(u, "bg", bg);
    return u;
  }, [fg, bg]);

  return (
    <Footer>
      <Inner>
        <Brand>
          <img src={logo} alt="Bookface logo" />
          <WordmarkLink
            href="https://www.fontspace.com/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Font credit: FontSpace (opens in a new tab)"
            title="Font credit: FontSpace"
          >
            <WordmarkImg src={wordmarkSrc} alt="Bookface wordmark" />
          </WordmarkLink>
        </Brand>

        <Meta>
          <Creator>
            Created by <strong>Girlie Razon</strong>
          </Creator>
          <Copy>
            BF <CopyrightIcon fontSize="inherit" /> {year}
          </Copy>
        </Meta>
      </Inner>
    </Footer>
  );
}
