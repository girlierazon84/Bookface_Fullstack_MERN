// frontend/src/view/SignUpFormView.tsx

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import CreateUser from "../components/users/CreateUser";
import RoutingPath from "../routes/RoutingPath";


const SignUpFormView: React.FC = () => {
    return (
        <Page>
            <Shell>
                <Card>
                    <Title>Create a new account</Title>
                    <SubTitle>It’s quick and easy.</SubTitle>
                    <Divider />
                    <CreateUser />
                    <FooterText>
                        Already have an account? <LinkStyled to={RoutingPath.usersLogInView}>Log in</LinkStyled>
                    </FooterText>
                </Card>
            </Shell>
        </Page>
    );
};

export default SignUpFormView;

const Page = styled.main`
    background: var(--primary-color);
    min-height: calc(100vh - 85px);
    display: grid;
    place-items: center;
    padding: 30px 0;
`;

const Shell = styled.section`
    width: min(900px, 92%);
`;

const Card = styled.div`
    background: var(--fifthly-color);
    border: 1px solid rgba(97, 97, 97, 0.25);
    border-radius: 16px;
    box-shadow: 0 10px 24px rgba(97, 97, 97, 0.25);
    padding: 18px;
`;

const Title = styled.h1`
    margin: 0;
    color: var(--secondary-color);
    font-weight: 900;
    font-size: 1.8rem;
`;

const SubTitle = styled.p`
    margin: 6px 0 0;
    color: var(--fourthly-color);
    font-weight: 700;
`;

const Divider = styled.hr`
    border: none;
    border-top: 1px solid rgba(97, 97, 97, 0.2);
    margin: 12px 0;
`;

const FooterText = styled.p`
    margin: 14px 0 0;
    text-align: center;
    color: var(--fourthly-color);
    font-weight: 700;
`;

const LinkStyled = styled(Link)`
    color: var(--secondary-color);
    text-decoration: none;
    font-weight: 900;

    &:hover {
        text-decoration: underline;
    }
`;
