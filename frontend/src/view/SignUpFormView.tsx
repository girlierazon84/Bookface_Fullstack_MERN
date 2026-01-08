// frontend/src/view/SignUpFormView.tsx

import React from "react";
import styled from "styled-components";
import CreateUser from "../components/users/CreateUser";


const SignUpFormView: React.FC = () => {
    return (
        <Article>
            <CreateUser />
        </Article>
    );
};

export default SignUpFormView;

const Article = styled.article`
    background-color: var(--primary-color);
    padding: 100px 60px;
`;
