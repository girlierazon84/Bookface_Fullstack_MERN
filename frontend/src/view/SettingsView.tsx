// frontend/src/view/SettingsView.tsx

import React from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { useUserContext } from "../provider/UserProvider";
import RoutingPath from "../routes/routingPath";


/**---------------------
    Styled-Component
------------------------*/
const Page = styled.main`
    background: ${({ theme }) => theme.colors.primary};
    min-height: calc(100vh - 85px);
    padding: 20px 0 60px;
    display: grid;
    place-items: start center;
`;

const Card = styled.section`
    width: min(900px, 92%);
    background: ${({ theme }) => theme.colors.fourthly};
    border: 1px solid rgba(97, 97, 97, 0.25);
    border-radius: 16px;
    box-shadow: ${({ theme }) => theme.colors.card_shadow};
    padding: 18px;
    display: grid;
    gap: 12px;
`;

const Title = styled.h1`
    margin: 0;
    color: ${({ theme }) => theme.colors.text_primary};
    font-weight: 900;
    font-size: 1.6rem;
`;

const Sub = styled.p`
    margin: 0 0 6px;
    color: ${({ theme }) => theme.colors.text_secondary};
    font-weight: 700;
`;

const Row = styled.div`
    background: ${({ theme }) => theme.colors.primary};
    border: 1px solid rgba(97, 97, 97, 0.2);
    border-radius: 12px;
    padding: 12px;
    display: flex;
    justify-content: space-between;
    gap: 12px;
`;

const Label = styled.span`
    color: ${({ theme }) => theme.colors.text_primary};
    font-weight: 900;
`;

const Value = styled.span`
    color: ${({ theme }) => theme.colors.text_secondary};
    font-weight: 900;
`;

const SettingsView: React.FC = () => {
    const { token, user } = useUserContext();

    if (!token) return <Navigate to={RoutingPath.usersLogInView} replace />;
    if (!user) return <Navigate to={RoutingPath.homeView} replace />;

    return (
        <Page>
            <Card>
                <Title>Settings</Title>
                <Sub>Manage your Bookface preferences.</Sub>

                <Row>
                    <Label>Account</Label>
                    <Value>{user.username}</Value>
                </Row>

                <Row>
                    <Label>Email</Label>
                    <Value>{user.email || "—"}</Value>
                </Row>

                <Row>
                    <Label>Theme</Label>
                    <Value>Default (Bookface)</Value>
                </Row>

                <Row>
                    <Label>Privacy</Label>
                    <Value>Coming soon</Value>
                </Row>
            </Card>
        </Page>
    );
};

export default SettingsView;
