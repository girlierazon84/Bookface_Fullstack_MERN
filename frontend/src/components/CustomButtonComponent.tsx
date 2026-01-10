// frontend/src/components/CustomButtonComponent.tsx

import React from "react";
import styled from "styled-components";


/**-----------------------------------------------------------
    Custom Button Components: Primary and Secondary styles
--------------------------------------------------------------*/
const ButtonPrimary = styled.button`
  width: 100%;
  height: 46px;
  border-radius: 14px;
  padding: 0 14px;

  border: 1px solid ${({ theme }) => theme.colors.fourthly};
  background: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};

  font-size: 1rem;
  font-weight: 900;
  letter-spacing: 0.2px;

  cursor: pointer;
  box-shadow: ${({ theme }) => theme.colors.card_shadow};

  &:hover {
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.secondary};
    border-color: ${({ theme }) => theme.colors.secondary};
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

  border: ${({ theme }) => theme.colors.secondary};
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};

  font-size: 1rem;
  font-weight: 900;

  cursor: pointer;

  &:hover {
    border-color: ${({ theme }) => theme.colors.fourthly};
    color: ${({ theme }) => theme.colors.primary};
    background: ${({ theme }) => theme.colors.secondary};
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

// Button component props type
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

// Primary Button component
const PrimaryButton: React.FC<ButtonProps> = ({ children, onClick, type = "button", disabled }) => {
  return (
    <ButtonPrimary type={type} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonPrimary>
  );
};

// Secondary Button component
const SecondaryButton: React.FC<ButtonProps> = ({ children, onClick, type = "button", disabled }) => {
  return (
    <ButtonSecondary type={type} onClick={onClick} disabled={disabled}>
      {children}
    </ButtonSecondary>
  );
};

export { PrimaryButton, SecondaryButton };
