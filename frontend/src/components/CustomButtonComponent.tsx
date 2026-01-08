// frontend/src/components/CustomButtonComponent.tsx

import React from "react";
import styled from "styled-components";


type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick, type = "button", disabled }) => {
  return (
    <ButtonPrimary type={type} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonPrimary>
  );
};

const SecondaryButton: React.FC<ButtonProps> = ({ children, onClick, type = "button", disabled }) => {
  return (
    <ButtonSecondary type={type} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonSecondary>
  );
};

export { PrimaryButton, SecondaryButton };

const ButtonPrimary = styled.button`
  background-color: var(--secondary-color);
  border-radius: 5px;
  padding: 10px 20px;
  border: 2px solid var(--fifthly-color);
  box-shadow: 1.5px 2px 1.5px 2px var(--fourthly-color);
  color: var(--fifthly-color);
  font-size: 1em;
  text-transform: uppercase;
  font-weight: 700;
  width: 100%;
  cursor: pointer;

  &:hover {
    background-color: var(--fourthly-color);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const ButtonSecondary = styled.button`
  background-color: chocolate;
  border-radius: 10px;
  padding: 2px 20px;
  border: none;
  color: #111;
  font-size: 1.25em;
  cursor: pointer;

  &:hover {
    background-color: #111;
    color: chocolate;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;
