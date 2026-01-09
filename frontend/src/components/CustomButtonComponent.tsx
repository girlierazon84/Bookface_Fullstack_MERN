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
  width: 100%;
  height: 46px;
  border-radius: 14px;
  padding: 0 14px;

  border: 1px solid rgba(97, 97, 97, 0.2);
  background: var(--secondary-color);
  color: var(--fifthly-color);

  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 0.2px;

  cursor: pointer;
  box-shadow: 0 10px 24px rgba(97, 97, 97, 0.2);

  &:hover {
    background: var(--fourthly-color);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const ButtonSecondary = styled.button`
  width: 100%;
  height: 46px;
  border-radius: 14px;
  padding: 0 14px;

  border: 1px solid rgba(97, 97, 97, 0.25);
  background: white;
  color: var(--fourthly-color);

  font-size: 1rem;
  font-weight: 900;

  cursor: pointer;

  &:hover {
    border-color: var(--secondary-color);
    color: var(--secondary-color);
  }

  &:active {
    transform: translateY(1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;
