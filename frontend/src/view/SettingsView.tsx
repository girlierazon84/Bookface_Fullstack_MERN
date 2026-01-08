// frontend/src/view/SettingsView.tsx

import React from "react";
import { Navigate } from "react-router-dom";
import styled from "styled-components";

import { useUserContext } from "../utils/global/provider/UserProvider";
import RoutingPath from "../routes/RoutingPath";


const SettingsView: React.FC = () => {
    const { authenticatedUser } = useUserContext();

    if (!authenticatedUser) {
        return <Navigate to={RoutingPath.usersLogInView} replace />;
    }

    return (
        <Page>
            <Card>
                <Title>Settings</Title>
                <Sub>Manage your Bookface preferences.</Sub>

                <Row>
                    <Label>Account</Label>
                    <Value>{authenticatedUser}</Value>
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

const Page = styled.main`
    background: var(--primary-color);
    min-height: calc(100vh - 85px);
    padding: 20px 0 60px;
    display: grid;
    place-items: start center;
`;

const Card = styled.section`
    width: min(900px, 92%);
    background: var(--fifthly-color);
    border: 1px solid rgba(97, 97, 97, 0.25);
    border-radius: 16px;
    box-shadow: 0 10px 24px rgba(97, 97, 97, 0.25);
    padding: 18px;
    display: grid;
    gap: 12px;
`;

const Title = styled.h1`
    margin: 0;
    color: var(--secondary-color);
    font-weight: 900;
    font-size: 1.6rem;
`;

const Sub = styled.p`
    margin: 0 0 6px;
    color: var(--fourthly-color);
    font-weight: 700;
`;

const Row = styled.div`
    background: white;
    border: 1px solid rgba(97, 97, 97, 0.2);
    border-radius: 12px;
    padding: 12px;
    display: flex;
    justify-content: space-between;
    gap: 12px;
`;

const Label = styled.span`
    color: var(--fourthly-color);
    font-weight: 900;
`;

const Value = styled.span`
    color: var(--secondary-color);
    font-weight: 900;
`;
