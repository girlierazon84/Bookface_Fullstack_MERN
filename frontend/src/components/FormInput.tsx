// frontend/src/components/FormInput.tsx

import React from "react";
import styled from "styled-components";

/**------------------------------------
    Styled Components for FormInput
---------------------------------------*/
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`;

const StyledLabel = styled.label`
  font-family: "Oxygen", sans-serif;
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.35rem;
  color: ${({ theme }) => theme.colors.text_primary};
`;

const StyledRequiredAsterisk = styled.span`
  color: rgb(220, 38, 38);
  margin-left: 0.15rem;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const InputField = styled.input<{ $hasError?: boolean; $hasIcon?: boolean }>`
  width: 100%;
  padding: 0.75rem 1rem;
  padding-right: ${({ $hasIcon }) => ($hasIcon ? "2.75rem" : "1rem")};
  font-size: 1rem;

  /* Always show a border; change color when error */
  border: 2px solid
    ${({ $hasError, theme }) =>
      $hasError ? "rgba(220, 38, 38, 0.9)" : theme.colors.secondary};

  border-radius: 12px;
  outline: none;

  background-color: ${({ theme }) => theme.colors.fourthly};
  color: ${({ theme }) => theme.colors.text_primary};

  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    font-style: italic;
    font-size: 0.85rem;
    opacity: 0.8;
    color: ${({ theme }) => theme.colors.text_secondary};
  }

  &:focus {
    border-color: ${({ $hasError, theme }) =>
      $hasError ? "rgba(220, 38, 38, 0.9)" : theme.colors.secondary};

    box-shadow: 0 0 0 3px
      ${({ $hasError }) =>
        $hasError ? "rgba(220, 38, 38, 0.15)" : "rgba(0, 0, 153, 0.15)"};
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const IconSlot = styled.div`
  position: absolute;
  right: 1rem;
  display: grid;
  place-items: center;
  opacity: 0.8;

  svg,
  img {
    width: 20px;
    height: 20px;
  }
`;

const ErrorText = styled.span`
  font-size: 0.8rem;
  color: rgb(220, 38, 38);
  margin-top: 0.25rem;
  font-weight: 600;
`;

const getDefaultLabel = (name: string) =>
  name
    .replace(/_/g, " ")
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .trim();

/**----------------------------------
    Props for FormInput component
-------------------------------------*/
export type FormInputProps = Omit<
  React.InputHTMLAttributes<HTMLInputElement>,
  "onChange" | "type" | "value" | "name"
> & {
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  name: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  icon?: React.ReactNode;
};

/**------------------------
    FormInput Component
---------------------------*/
const FormInput: React.FC<FormInputProps> = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  error,
  icon,
  placeholder,
  required,
  disabled,
  ...rest
}) => {
  const inferredLabel = label ?? getDefaultLabel(name);
  const describedBy = error ? `${name}-error` : rest["aria-describedby"];

  return (
    <InputWrapper>
      <StyledLabel htmlFor={name}>
        {inferredLabel}
        {required ? (
          <StyledRequiredAsterisk aria-hidden="true">*</StyledRequiredAsterisk>
        ) : null}
      </StyledLabel>

      <InputContainer>
        <InputField
          id={name}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder ?? `Enter ${inferredLabel.toLowerCase()}`}
          onChange={onChange}
          required={required}
          disabled={disabled}
          $hasError={!!error}
          $hasIcon={!!icon}
          aria-invalid={!!error}
          aria-describedby={describedBy}
          {...rest}
        />
        {icon ? <IconSlot aria-hidden="true">{icon}</IconSlot> : null}
      </InputContainer>

      {error ? (
        <ErrorText id={`${name}-error`} role="alert">
          {error}
        </ErrorText>
      ) : null}
    </InputWrapper>
  );
};

export default FormInput;
export { FormInput };
