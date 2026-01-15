// frontend/src/components/RegistrationForm.tsx

import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import authService from "../service/authService";
import {
    PrimaryButton,
    SecondaryButton
} from "../components/CustomButtonComponent";
import routingPath from "../routes/routingPath";
import { useUserContext } from "../provider/UserProvider";
import FormInput from "../components/FormInput";


/**----------------------
    Styled Components
-------------------------*/
const Form = styled.form`
    display: grid;

  /* One place to control spacing for the whole form */
    gap: 14px;
`;

const FieldRow = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 14px;

    @media (min-width: 520px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const Actions = styled.div`
    display: grid;
    gap: 10px;
    width: 100%;
    margin-top: 6px;

    @media (min-width: 520px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const StatusText = styled.p`
    text-align: center;
    font-weight: 900;
    min-height: 22px;
    margin: 0;
    color: ${({ theme }) => theme.colors.text_primary};
`;

// Field error type definition for form validation errors
type FieldErrors = Partial<Record<"firstname" | "lastname" | "email" | "username" | "password", string>>;

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const isValidUsername = (value: string) =>
    /^[a-zA-Z0-9](?:[a-zA-Z0-9._-]*[a-zA-Z0-9])?$/.test(value) &&
    value.length >= 3 &&
    value.length <= 40;

const RegistrationForm: React.FC = () => {
    const navigate = useNavigate();
    const { setAuth } = useUserContext();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [errors, setErrors] = useState<FieldErrors>({});
    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const trimmed = useMemo(
        () => ({
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            email: email.trim().toLowerCase(),
            username: username.trim(),
            password,
        }),
        [firstname, lastname, email, username, password]
    );

    const validate = (): FieldErrors => {
        const next: FieldErrors = {};

        if (!trimmed.firstname) next.firstname = "First name is required";
        if (!trimmed.lastname) next.lastname = "Last name is required";

        if (!trimmed.email) next.email = "Email is required";
        else if (!isValidEmail(trimmed.email)) next.email = "Enter a valid email";

        if (!trimmed.username) next.username = "Username is required";

        if (!trimmed.password) next.password = "Password is required";
        else if (trimmed.password.length < 6) next.password = "Password must be at least 6 characters";

        if (!trimmed.username) next.username = "Username is required";
        else if (!isValidUsername(trimmed.username))
            next.username =
                "Username must be 3–40 chars, use letters/numbers and . _ -, and start/end with a letter or number.";

        return next;
    };

    const clear = () => {
        setFirstname("");
        setLastname("");
        setEmail("");
        setUsername("");
        setPassword("");
        setErrors({});
        setStatus("");
    };

    const register = async () => {
        if (isSubmitting) return;

        const nextErrors = validate();
        setErrors(nextErrors);

        if (Object.keys(nextErrors).length > 0) {
            setStatus("❌ Please fix the highlighted fields.");
            return;
        }

        setIsSubmitting(true);
        setStatus("");

        try {
            const res = await authService.register({
                firstname: trimmed.firstname,
                lastname: trimmed.lastname,
                email: trimmed.email,
                username: trimmed.username,
                password: trimmed.password,
            });

            // ✅ expect AuthResponse directly (not AxiosResponse)
            setAuth(res.data.token, res.data.user);
            navigate(routingPath.homeView, { replace: true });
        } catch (e: any) {
            const data = e?.response?.data;
            const fieldErrors = data?.errors?.fieldErrors;

            const firstFieldError =
                fieldErrors && typeof fieldErrors === "object"
                    ? Object.values(fieldErrors).flat()?.[0]
                    : null;

            const msg =
                firstFieldError ||
                data?.message ||
                e?.message ||
                "Registration failed. Please try again.";

            setStatus(`❌ ${msg}`);
        }finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Form
            onSubmit={(e) => {
                e.preventDefault();
                register();
            }}
        >
            <FieldRow>
                <FormInput
                    label="First name"
                    name="firstname"
                    value={firstname}
                    onChange={(e) => {
                        setFirstname(e.target.value);
                        if (errors.firstname) setErrors((p) => ({ ...p, firstname: undefined }));
                    }}
                    autoComplete="given-name"
                    required
                    error={errors.firstname}
                    placeholder="Enter first name"
                />

                <FormInput
                    label="Last name"
                    name="lastname"
                    value={lastname}
                    onChange={(e) => {
                        setLastname(e.target.value);
                        if (errors.lastname) setErrors((p) => ({ ...p, lastname: undefined }));
                    }}
                    autoComplete="family-name"
                    required
                    error={errors.lastname}
                    placeholder="Enter last name"
                />
            </FieldRow>

            <FormInput
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) setErrors((p) => ({ ...p, email: undefined }));
                }}
                autoComplete="email"
                inputMode="email"
                required
                error={errors.email}
                placeholder="name@example.com"
            />

            <FormInput
                label="Username"
                name="username"
                value={username}
                onChange={(e) => {
                    setUsername(e.target.value);
                    if (errors.username) setErrors((p) => ({ ...p, username: undefined }));
                }}
                autoComplete="username"
                required
                error={errors.username}
                placeholder="Choose a username"
            />

            <FormInput
                label="Password"
                name="password"
                type="password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                    if (errors.password) setErrors((p) => ({ ...p, password: undefined }));
                }}
                autoComplete="new-password"
                required
                error={errors.password}
                placeholder="Create a password"
            />

            <StatusText role="status" aria-live="polite">
                {status}
            </StatusText>

            <Actions>
                <PrimaryButton type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Sign Up"}
                </PrimaryButton>

                <SecondaryButton type="button" onClick={clear} disabled={isSubmitting}>
                    Clear
                </SecondaryButton>
            </Actions>
        </Form>
    );
};

export default RegistrationForm;
