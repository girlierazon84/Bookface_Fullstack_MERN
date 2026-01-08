// frontend/src/components/users/CreateUser.tsx

import React, { useState } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";

import UserService from "../../utils/api/service/UserService";
import type { CreateUserObject } from "../../utils/interface/UsersInterfaces";
import { PrimaryButton } from "../CustomButtonComponent";
import RoutingPath from "../../routes/RoutingPath";


const CreateUser: React.FC = () => {
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [userName, setUserName] = useState("");
    const [passWord, setPassWord] = useState("");
    const [status, setStatus] = useState<string>("");

    const createUser = async () => {
        const payload: CreateUserObject = {
            firstname: firstName,
            lastname: lastName,
            email,
            username: userName,
            password: passWord
        };

        try {
            await UserService.createUser(payload);
            setStatus("✅ Successfully registered!");
            navigate(RoutingPath.usersLogInView);
        } catch {
            setStatus("❌ Registration failed");
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
            <H1>Sign Up</H1>

            <Article>
                <label>
                    Firstname:
                    <Input value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                </label>

                <label>
                    Lastname:
                    <Input value={lastName} onChange={(e) => setLastName(e.target.value)} />
                </label>

                <label>
                    Email:
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>

                <label>
                    Username:
                    <Input value={userName} onChange={(e) => setUserName(e.target.value)} />
                </label>

                <label>
                    Password:
                    <Input type="password" value={passWord} onChange={(e) => setPassWord(e.target.value)} />
                </label>
            </Article>

            <StatusText>{status}</StatusText>

            <GridContainer>
                <div className="submit__btn">
                    <PrimaryButton onClick={createUser}>Submit</PrimaryButton>
                </div>
                <div className="clear__btn">
                    <PrimaryButton onClick={clearInputs} type="reset">
                        Clear
                    </PrimaryButton>
                </div>
            </GridContainer>

            <H4>
                Already have an account? <Link to={RoutingPath.usersLogInView}>Log in</Link>
            </H4>
        </>
    );
};

export default CreateUser;

const Article = styled.article`
    padding: 5%;
    border: 1px solid var(--thirdly-color);
    box-shadow: 5px 10px 8px 5px var(--fourthly-color);
    border-radius: 1em;
    background-color: var(--thirdly-color);
    width: 100%;

    label {
        display: grid;
        gap: 6px;
        margin-bottom: 16px;
        color: var(--fourthly-color);
        font-weight: 600;
    }
`;

const H1 = styled.h1`
    font-size: 2em;
    font-family: "Oxygen - Regular", sans-serif;
    color: var(--fourthly-color);
    text-align: center;
`;

const Input = styled.input`
    padding: 0.75em 1em;
    font-family: "Oxygen - Regular", sans-serif;
    font-size: 1em;
    width: 100%;
    border-radius: 5px;
    border: 1px solid var(--fifthly-color);
`;

const GridContainer = styled.div`
    display: flex;
    gap: 12px;
    width: 100%;
`;

const StatusText = styled.p`
    text-align: center;
    font-weight: 700;
    min-height: 24px;
`;

const H4 = styled.h4`
    color: var(--fourthly-color);
    font-weight: 700;
    text-align: center;
`;
