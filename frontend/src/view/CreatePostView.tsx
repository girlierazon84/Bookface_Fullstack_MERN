// frontend/src/view/CreatePostView.tsx

import React from "react";
import styled from "styled-components";
import CreateNewPost from "../components/posts/CreateNewPost";


const CreatePostView: React.FC = () => {
    return (
        <Article>
            <CreateNewPost />
        </Article>
    );
};

export default CreatePostView;

const Article = styled.article`
    background-color: var(--primary-color);
    padding: 2rem 0 18rem 0;
`;
