import React from 'react'
import styled from "styled-components";
import {useUserContext} from "../utils/global/provider/UserProvider";


const ProfileView = () => {
    const {authenticatedUser} = useUserContext()
    const imgUrl = 'https://thispersondoesnotexist.com/image'

    
    return (
        <Article>
            <h1>My Profile</h1>
            <GridContainer>
                <div>
                    <Img src={ imgUrl }/>
                </div>

                <div>
                    <SpanUserName>{ authenticatedUser }</SpanUserName>
                </div>
            </GridContainer>
        </Article>
    )
}

export default ProfileView

const Article = styled.article`
  background-color: var(--primary-color);
  padding: 0.1em 0 18em 0;
  
  h1 {
    text-align: center;
    font-family: "Oleo Script", cursive;
    font-size: 3em;
    font-weight: 700;
    color:  var(--fourthly-color);
  }
`

const GridContainer = styled.div`
  display: inline-block;
  margin: 5%;
`

const Img = styled.img`
  width: 30%;
  border: 1px solid var(--thirdly-color);
  border-radius: 10px;
`

const SpanUserName = styled.span`
  color: var(--secondary-color);
  font-family: "Oleo Script", sans-serif;
  font-weight: bold;
`