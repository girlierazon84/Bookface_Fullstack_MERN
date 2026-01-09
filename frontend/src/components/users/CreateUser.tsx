// frontend/src/components/users/CreateUser.tsx

import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

import AuthService from "../../utils/api/service/AuthService";
import { PrimaryButton } from "../CustomButtonComponent";
import RoutingPath from "../../routes/RoutingPath";
import { useUserContext } from "../../utils/global/provider/UserProvider";


const CreateUser: React.FC = () => {
    const navigate = useNavigate();
    const { setAuth } = useUserContext();

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = (): string | null => {
        if (!firstname.trim()) return "Firstname is required";
        if (!lastname.trim()) return "Lastname is required";
        if (!email.trim()) return "Email is required";
        if (!username.trim()) return "Username is required";
        if (!password) return "Password is required";
        if (password.length < 6) return "Password must be at least 6 characters";
        return null;
    };

    const clear = () => {
        setFirstname("");
        setLastname("");
        setEmail("");
        setUsername("");
        setPassword("");
        setStatus("");
    };

    const register = async () => {
        if (isSubmitting) return;

        const err = validate();
        if (err) {
            setStatus(`❌ ${err}`);
            return;
        }

        setIsSubmitting(true);
        setStatus("");

        try {
            const res = await AuthService.register({
                firstname: firstname.trim(),
                lastname: lastname.trim(),
                email: email.trim().toLowerCase(),
                username: username.trim(),
                password
            });

            setAuth(res.data.token, res.data.user);
            navigate(RoutingPath.homeView, { replace: true });
        } catch (e: any) {
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
                    <label>
                        First name
                        <Input
                            value={firstname}
                            onChange={(e) => setFirstname(e.target.value)}
                            autoComplete="given-name"
                        />
                    </label>

                    <label>
                        Last name
                        <Input
                            value={lastname}
                            onChange={(e) => setLastname(e.target.value)}
                            autoComplete="family-name"
                        />
                    </label>
                </FieldRow>

                <label>
                    Email
                    <Input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                    />
                </label>

                <label>
                    Username
                    <Input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        autoComplete="username"
                    />
                </label>

                <label>
                    Password
                    <Input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="new-password"
                    />
                </label>
            </Article>

            <StatusText role="status">{status}</StatusText>

            <GridContainer>
                <PrimaryButton onClick={register} type="button">
                    {isSubmitting ? "Creating..." : "Sign Up"}
                </PrimaryButton>

                <PrimaryButton onClick={clear} type="button">
                    Clear
                </PrimaryButton>
            </GridContainer>
        </>
    );
};

export default CreateUser;

/**----------------------
    Styled Components
-------------------------*/
const Article = styled.article`
    padding: 14px;
    border: 1px solid rgba(97, 97, 97, 0.25);
    border-radius: 16px;
    background-color: white;

    label {
        display: grid;
        gap: 6px;
        margin-bottom: 12px;
        color: var(--fourthly-color);
        font-weight: 900;
    }
`;

const FieldRow = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    gap: 10px;

    @media (min-width: 520px) {
        grid-template-columns: 1fr 1fr;
    }
`;

const Input = styled.input`
    height: 46px;
    padding: 0 12px;
    font-family: "Oxygen - Regular", sans-serif;
    font-size: 1rem;
    width: 100%;
    border-radius: 12px;
    border: 1px solid rgba(97, 97, 97, 0.25);
    background: white;
    outline: none;

    &:focus {
        border-color: var(--secondary-color);
        box-shadow: 0 0 0 3px rgba(0, 0, 153, 0.15);
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
    color: var(--fourthly-color);
`;