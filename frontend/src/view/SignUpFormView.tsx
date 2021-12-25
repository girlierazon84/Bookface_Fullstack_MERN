import React from 'react'
import CreateUser from "../components/users/CreateUser";
import styled from "styled-components";



const SignUpFormView = () => {
    return (
        <Article>
            <CreateUser/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </Article>
    )
}

export default SignUpFormView

const Article = styled.article`
background-color: var(--primary-color);
padding: 100px 60px;
`