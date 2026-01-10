// frontend/src/components/RegistrationForm.tsx

import React, { useMemo, useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import AuthService from "../api/service/AuthService";
import {
    PrimaryButton,
    SecondaryButton
} from "../components/CustomButtonComponent";
import RoutingPath from "../routes/RoutingPath";
import { useUserContext } from "../provider/UserProvider";
import FormInput from "../components/FormInput";


/**----------------------
    Styled Components
-------------------------*/
const Article = styled.article`
    padding-right: 22px;
`;

const FieldRow = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;

    @media (min-width: 520px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const GridContainer = styled.div`
    display: grid;
    gap: 10px;
    width: 100%;
    margin-top: 12px;

    @media (min-width: 520px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const StatusText = styled.p`
    text-align: center;
    font-weight: 900;
    min-height: 22px;
    margin: 10px 0 0;
    color: ${({ theme }) => theme.colors.text_primary};
`;

// Field error type definition for form validation errors
type FieldErrors = Partial<
    Record<"firstname" | "lastname" | "email" | "username" | "password", string>
>;

// Simple email validation regex function
const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

// CreateUser component definition
const CreateUser: React.FC = () => {
    // Hooks and state variables initialization
    const navigate = useNavigate();
    const { setAuth } = useUserContext();

    // Form field states
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // Error and status states for form validation and submission feedback
    const [errors, setErrors] = useState<FieldErrors>({});
    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Memoized trimmed values for validation and submission
    const trimmed = useMemo(
        () => ({
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            email: email.trim().toLowerCase(),
            username: username.trim(),
            password
        }),
        [firstname, lastname, email, username, password]
    );

    // Validation function to check form fields and return errors if any
    const validate = (): FieldErrors => {
        // Initialize an empty errors object to collect validation errors
        const next: FieldErrors = {};

        // Validate each field and add error messages to the next object if validation fails
        if (!trimmed.firstname) next.firstname = "First name is required";
        if (!trimmed.lastname) next.lastname = "Last name is required";

        // Email validation with regex check for proper format
        if (!trimmed.email) next.email = "Email is required";
        else if (!isValidEmail(trimmed.email)) next.email = "Enter a valid email";

        // Username validation to ensure it's not empty
        if (!trimmed.username) next.username = "Username is required";

        // Password validation for minimum length requirement
        if (!trimmed.password) next.password = "Password is required";
        else if (trimmed.password.length < 6)
            next.password = "Password must be at least 6 characters";

        return next;
    };

    // Clear function to reset form fields and states to their initial values
    const clear = () => {
        setFirstname("");
        setLastname("");
        setEmail("");
        setUsername("");
        setPassword("");
        setErrors({});
        setStatus("");
    };

    // Register function to handle form submission and user registration
    const register = async () => {
        if (isSubmitting) return;

        // Validate form fields and set errors if any
        const nextErrors = validate();
        setErrors(nextErrors);

        // If there are validation errors, set status message and abort submission
        if (Object.keys(nextErrors).length > 0) {
            setStatus("❌ Please fix the highlighted fields.");
            return;
        }

        // Proceed with registration if validation passes
        setIsSubmitting(true);
        setStatus("");

        // Attempt to register the user via AuthService
        try {
            const res = await AuthService.register({
                firstname: trimmed.firstname,
                lastname: trimmed.lastname,
                email: trimmed.email,
                username: trimmed.username,
                password: trimmed.password
            });

            // On successful registration, set authentication and navigate to home view
            setAuth(res.data.token, res.data.user);
            navigate(RoutingPath.homeView, { replace: true });
        } catch (e: any) {
            // Handle errors during registration and set appropriate status message
            const msg =
                e?.response?.data?.message ||
                e?.message ||
                "Registration failed. Please try again.";
            setStatus(`❌ ${msg}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <Article>
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
            </Article>

            <StatusText role="status" aria-live="polite">
                {status}
            </StatusText>

            <GridContainer>
                <PrimaryButton onClick={register} type="button" disabled={isSubmitting}>
                    {isSubmitting ? "Creating..." : "Sign Up"}
                </PrimaryButton>

                <SecondaryButton onClick={clear} type="button" disabled={isSubmitting}>
                    Clear
                </SecondaryButton>
            </GridContainer>
        </>
    );
};

export default CreateUser;
