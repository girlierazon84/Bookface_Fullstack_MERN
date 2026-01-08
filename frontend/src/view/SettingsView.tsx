// frontend/src/view/SettingsView.tsx

import React from "react";
import styled from "styled-components";


const SettingsView: React.FC = () => {
    return (
        <Article>
            <h1>Settings View</h1>
        </Article>
    );
};

export default SettingsView;

const Article = styled.article`
    background-color: var(--primary-color);
    padding: 2rem 0 18rem 0;

    h1 {
        text-align: center;
    }
`;
