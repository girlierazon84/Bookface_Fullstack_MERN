import React from 'react'
import styled from 'styled-components'

interface ButtonProps {
    children: React.ReactNode;
    onClick: () => void;
}

const PrimaryButton: React.FC<ButtonProps> = ({children, onClick}) => {
    let reset;
    return (
        <ButtonPrimary onClick={ onClick }>
            { children }
        </ButtonPrimary>
    )
}

const SecondaryButton: React.FC<ButtonProps> = ({children, onClick}) => {
    return (
        <ButtonSecondary onClick={ onClick }>
            { children }
        </ButtonSecondary>
    )
}

export {
    PrimaryButton,
    SecondaryButton
}

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
    background-color: var(--fifthly);
    color: var(--secondary-color);
  }
`

const ButtonSecondary = styled.button`
  background-color: chocolate;
  border-radius: 10px;
  padding: 2px 20px;
  border: none;
  color: #111;
  font-size: 1.25em;

  &:hover {
    background-color: #111;
    color: chocolate;
  }
`