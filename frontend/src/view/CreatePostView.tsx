import React from 'react'
import styled from "styled-components";
import CreateNewPost from "../components/posts/CreateNewPost";


const CreatePostView = () => {

    return (
        <Article>
            <CreateNewPost/>
        </Article>
    )
}

export default CreatePostView


const Article = styled.article`
  background-color: var(--primary-color);
  padding: 0.1em 0 18em 0;
`
