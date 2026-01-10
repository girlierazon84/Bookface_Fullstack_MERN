// frontend/src/view/SignUpFormView.tsx

import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import RegistrationForm from "../components/RegistrationForm";
import RoutingPath from "../routes/RoutingPath";


/**------------------------------------
    SignUpFormView Styled Component
---------------------------------------*/
const Page = styled.main`
    background: ${({ theme }) => theme.colors.primary};
    min-height: calc(100vh - 85px);
    display: grid;
    place-items: center;
    padding: 30px 0;
    width: min(900px, 92%);
`;

const Card = styled.div`
    background: var(--fifthly-color);
    border: 1px solid rgba(97, 97, 97, 0.25);
    border-radius: 16px;
    box-shadow: ${({ theme }) => theme.colors.card_shadow};
    padding: 18px;
`;

const Title = styled.h1`
    margin: 0;
    color: ${({ theme }) => theme.colors.text_primary};
    font-weight: 800;
    font-size: 1.8rem;
    font-family: "Oleo Script Swash Caps", sans-serif;
    text-align: center;
`;

const SubTitle = styled.p`
    margin: 6px 0 0;
    color: ${({ theme }) => theme.colors.text_secondary};
    font-family: "Oleo Script Swash Caps", sans-serif;
    text-align: center;
`;

const Divider = styled.hr`
    border: none;
    border-top: 1px solid rgba(97, 97, 97, 0.2);
    margin: 12px 0;
`;

const FooterText = styled.p`
    margin: 14px 0 0;
    text-align: center;
    color: ${({ theme }) => theme.colors.text_secondary};
    font-weight: 700;
`;

const LinkStyled = styled(Link)`
    color: ${({ theme }) => theme.colors.secondary};
    text-decoration: none;
    font-weight: 900;

    &:hover {
        text-decoration: underline;
    }
`;

// SignUpFormView Component definition
const SignUpFormView: React.FC = () => {
    return (
        <Page>
            <Card>
                <Title>Create a new account</Title>
                <SubTitle>It’s quick and easy.</SubTitle>
                <Divider />
                <RegistrationForm />
                <FooterText>
                    Already have an account? <LinkStyled to={RoutingPath.usersLogInView}>Log in</LinkStyled>
                </FooterText>
            </Card>
        </Page>
    );
};

export default SignUpFormView;
