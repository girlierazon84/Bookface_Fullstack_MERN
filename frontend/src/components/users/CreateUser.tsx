// frontend/src/components/users/CreateUser.tsx

import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import UserService from "../../utils/api/service/UserService";
import type { CreateUserObject, UsersLogInDataObject } from "../../utils/interface/UsersInterfaces";
import { PrimaryButton } from "../CustomButtonComponent";
import RoutingPath from "../../routes/RoutingPath";
import { useUserContext } from "../../utils/global/provider/UserProvider";


const CreateUser: React.FC = () => {
    const navigate = useNavigate();
    const { setAuthenticatedUser } = useUserContext();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");

    const [status, setStatus] = useState<string>("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const validate = (): string | null => {
        if (!firstName.trim()) return "Firstname is required";
        if (!lastName.trim()) return "Lastname is required";
        if (!email.trim()) return "Email is required";
        if (!userName.trim()) return "Username is required";
        if (!passWord) return "Password is required";
        if (passWord.length < 6) return "Password must be at least 6 characters";
        return null;
    };

    const createAndLogin = async () => {
        const error = validate();
        if (error) {
            setStatus(`❌ ${error}`);
            return;
        }

        setIsSubmitting(true);
        setStatus("");

        const newUserPayload: CreateUserObject = {
            firstname: firstName.trim(),
            lastname: lastName.trim(),
            email: email.trim(),
            username: userName.trim(),
            password: passWord
        };

        try {
            // 1) Create user
            await UserService.createUser(newUserPayload);

            // 2) Auto login (verify)
            const loginPayload: UsersLogInDataObject = {
                username: newUserPayload.username,
                password: newUserPayload.password
            };

            const verifyRes = await UserService.verifyUser(loginPayload);

            if (verifyRes.data.message) {
                // 3) Persist auth (FB-like)
                setAuthenticatedUser(loginPayload.username);
                localStorage.setItem("username", loginPayload.username);

                setStatus("✅ Account created! Logging you in...");
                navigate(RoutingPath.homeView, { replace: true });
                return;
            }

            // If API returns false-ish
            setStatus("✅ Account created, but auto-login failed. Please log in.");
            navigate(RoutingPath.usersLogInView);
        } catch {
            setStatus("❌ Registration failed. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const clearInputs = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setUserName("");
        setPassWord("");
        setStatus("");
    };

    return (
        <>
            <Header>
                <H1>Create account</H1>
                <Sub>It’s quick and easy.</Sub>
            </Header>

            <Article>
                <FieldRow>
                    <label>
                        First name
                        <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" />
                    </label>

                    <label>
                        Last name
                        <Input value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" />
                    </label>
                </FieldRow>

                <label>
                    Email
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                </label>

                <label>
                    Username
                    <Input value={userName} onChange={(e) => setUserName(e.target.value)} autoComplete="username" />
                </label>

                <label>
                    Password
                    <Input
                        type="password"
                        value={passWord}
                        onChange={(e) => setPassWord(e.target.value)}
                        autoComplete="new-password"
                    />
                </label>
            </Article>

            <StatusText role="status">{status}</StatusText>

            <GridContainer>
                <PrimaryButton onClick={createAndLogin} type="submit">
                    {isSubmitting ? "Creating..." : "Sign Up"}
                </PrimaryButton>

                <PrimaryButton onClick={clearInputs} type="reset">
                    Clear
                </PrimaryButton>
            </GridContainer>

            <H4>
                Already have an account? <LinkStyled to={RoutingPath.usersLogInView}>Log in</LinkStyled>
            </H4>
        </>
    );
};

export default CreateUser;

const Header = styled.div`
    margin-bottom: 10px;
`;

const H1 = styled.h2`
    margin: 0;
    color: var(--secondary-color);
    font-weight: 900;
    font-size: 1.5rem;
`;

const Sub = styled.p`
    margin: 6px 0 0;
    color: var(--fourthly-color);
    font-weight: 700;
`;

const Article = styled.article`
    padding: 14px;
    border: 1px solid rgba(97, 97, 97, 0.25);
    border-radius: 14px;
    background-color: var(--thirdly-color);

    label {
        display: grid;
        gap: 6px;
        margin-bottom: 12px;
        color: var(--fourthly-color);
        font-weight: 800;
    }
`;

const FieldRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;

    @media (max-width: 520px) {
        grid-template-columns: 1fr;
    }
`;

const Input = styled.input`
    padding: 0.75em 0.9em;
    font-family: "Oxygen - Regular", sans-serif;
    font-size: 1em;
    width: 100%;
    border-radius: 10px;
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
    margin-top: 10px;
`;

const StatusText = styled.p`
    text-align: center;
    font-weight: 800;
    min-height: 24px;
    margin: 10px 0 0;
    color: var(--fourthly-color);
`;

const H4 = styled.p`
    color: var(--fourthly-color);
    font-weight: 800;
    text-align: center;
    margin-top: 14px;
`;

const LinkStyled = styled(Link)`
    color: var(--secondary-color);
    font-weight: 900;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;
