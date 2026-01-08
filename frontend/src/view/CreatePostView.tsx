// frontend/src/view/CreatePostView.tsx

import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";

import CreateNewPost from "../components/posts/CreateNewPost";
import { useUserContext } from "../utils/global/provider/UserProvider";
import RoutingPath from "../routes/RoutingPath";


const CreatePostView: React.FC = () => {
    const { token } = useUserContext();
    const navigate = useNavigate();

    if (!token) return <Navigate to={RoutingPath.usersLogInView} replace />;

    return (
        <Page>
            <Shell>
                <Card>
                    <Title>Create Post</Title>
                    <Sub>Share something with your friends.</Sub>

                    <CreateNewPost
                        onCreated={() => {
                            navigate(RoutingPath.homeView, { replace: true });
                        }}
                    />
                </Card>
            </Shell>
        </Page>
    );
};

export default CreatePostView;

const Page = styled.main`
    background: var(--primary-color);
    min-height: calc(100vh - 85px);
    padding: 20px 0 60px;
    display: grid;
    place-items: start center;
`;

const Shell = styled.section`
    width: min(900px, 92%);
`;

const Card = styled.section`
    background: var(--fifthly-color);
    border: 1px solid rgba(97, 97, 97, 0.25);
    border-radius: 16px;
    box-shadow: 0 10px 24px rgba(97, 97, 97, 0.25);
    padding: 16px;
`;

const Title = styled.h1`
    margin: 0;
    color: var(--secondary-color);
    font-weight: 900;
    font-size: 1.4rem;
`;

const Sub = styled.p`
    margin: 6px 0 12px;
    color: var(--fourthly-color);
    font-weight: 700;
`;
