// frontend/src/types/Burger.styled.ts

import styled from "styled-components";


type Props = {
  $open: boolean;
};

export const StyledBurger = styled.button<Props>`
  z-index: 70;
  cursor: pointer;

  width: 44px;
  height: 44px;
  border-radius: 14px;

  background: transparent;
  border: 1px solid transparent;

  display: grid;
  place-items: center;
  padding: 0;

  transition: transform 0.12s ease, background 0.18s ease, border-color 0.18s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    border-color: rgba(97, 97, 97, 0.18);
  }

  &:active {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 3px rgba(0, 0, 153, 0.18), ${({ theme }) => theme.colors.card_shadow};
    border-color: rgba(97, 97, 97, 0.25);
    background: ${({ theme }) => theme.colors.primary};
  }

  /* ✅ Burger ONLY on mobile */
  @media (min-width: 769px) {
    display: none;
  }

  .lines {
    width: 22px;
    height: 16px;
    display: grid;
    gap: 4px;
    position: relative;
  }

  span {
    height: 3px;
    width: 100%;
    border-radius: 999px;
    background-color: ${({ theme }) => theme.colors.secondary};

    transition: transform 0.2s ease, opacity 0.15s ease;
    transform-origin: center;
  }

  span:nth-child(1) {
    transform: ${({ $open }) => ($open ? "translateY(7px) rotate(45deg)" : "none")};
  }

  span:nth-child(2) {
    opacity: ${({ $open }) => ($open ? 0 : 1)};
    transform: ${({ $open }) => ($open ? "scaleX(0.6)" : "none")};
  }

  span:nth-child(3) {
    transform: ${({ $open }) => ($open ? "translateY(-7px) rotate(-45deg)" : "none")};
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
    span {
      transition: none;
    }
  }
`;
