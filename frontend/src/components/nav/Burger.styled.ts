// frontend/src/components/nav/Burger.styled.ts

import styled from "styled-components";


type Props = {
  open: boolean;
};

export const StyledBurger = styled.button<Props>`
  display: none;
  z-index: 20;
  cursor: pointer;
  width: 2rem;
  height: 2rem;

  position: absolute;
  top: 25px;
  right: 20px;

  border: none;
  background: transparent;
  padding: 0;

  @media (max-width: 768px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }

  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? "var(--fourthly-color)" : "var(--secondary-color)")};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.2s linear;

    &:nth-child(1) {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
    }

    &:nth-child(2) {
      transform: ${({ open }) => (open ? "translateX(100%)" : "translateX(0)")};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }

    &:nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
    }
  }
`;
