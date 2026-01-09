// frontend/src/components/nav/Burger.styled.ts

import styled from "styled-components";

// Props for the StyledBurger component to manage its open state styling
type Props = {
  $open: boolean;
};

// Styled component for the burger menu button with responsive design and animated lines
export const StyledBurger = styled.button<Props>`
  z-index: 60;
  cursor: pointer;

  width: 44px;
  height: 44px;
  border-radius: 14px;

  border: 1px solid rgba(97, 97, 97, 0.2);
  background: rgba(255, 255, 255, 0.7);

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 0;

  @media (min-width: 769px) {
    display: none;
  }

  .lines {
    width: 22px;
    height: 16px;
    display: grid;
    gap: 4px;
  }

  span {
    height: 3px;
    border-radius: 999px;
    background-color: ${({ $open }) => ($open ? "var(--fourthly-color)" : "var(--secondary-color)")};
    transition: all 0.2s linear;
    transform-origin: 1px;
  }

  span:nth-child(1) {
    transform: ${({ $open }) => ($open ? "rotate(45deg) translateY(6px)" : "none")};
  }

  span:nth-child(2) {
    opacity: ${({ $open }) => ($open ? 0 : 1)};
    transform: ${({ $open }) => ($open ? "translateX(8px)" : "none")};
  }

  span:nth-child(3) {
    transform: ${({ $open }) => ($open ? "rotate(-45deg) translateY(-6px)" : "none")};
  }
`;
