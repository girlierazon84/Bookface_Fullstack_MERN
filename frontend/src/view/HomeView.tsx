import React from 'react'
import styled, { keyframes } from 'styled-components'
import {Link} from "react-router-dom";

const HomeView = () => {
    return (
        <>
            <Article>
                <h1>Welcome!</h1>
                <h2>Bookface</h2>
                <p>Det är vårt slutprojekt med MERN stack, TypeScript och Bcrypt.</p>
                <GridContainer>
                    <div>
                        <Button><Link to='/log_in'>Log In</Link></Button>
                    </div>
                    <h3>OR</h3>
                    <div>
                        <Button><Link to='/sign_up'>Sign Up</Link></Button>
                    </div>
                </GridContainer>
            </Article>
        </>
    )
}

export default HomeView

const fadeInAnimation = keyframes`
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
`

const Article = styled.article`
  background-color: var(--primary-color);
  padding: 0.1em 0 18em 0;

  h1 {
    font-size: 3.8em;
    font-weight: bold;
    font-family: "Lucida Calligraphy", sans-serif;
    color: var(--fourthly-color);
    text-align: center;
    animation: ${ fadeInAnimation } 3s linear;
  }

  h2 {
    font-size: 3em;
    padding-top: 1.5em;
    color: var(--secondary-color);
    font-family: 'Oleo Script', sans-serif;
    font-weight: 700;
    text-align: center;
  }

  p {
    font-size: 1.5em;
    color: var(--fourthly-color);
    font-family: 'Oxygen - Regular', sans-serif;
    text-align: center;
  }
`

const GridContainer = styled.div`
  background-color: var(--fifthly-color);
  border: none;
  border-radius: 20px;
  //box-shadow: 5px 10px 8px 5px var(--fourthly-color);
  display: grid;
  width: 90%;
  height: 60%;
  text-align: center;
  margin: 5% 0 5% 5%;
  padding: 4% 0 4% 0;

  //button {
  //  background-color: var(--secondary-color);
  //  border: 2px solid var(--fifthly-color);
  //  border-radius: 10px;
  //  box-shadow: 1.5px 2px 1.5px 2px var(--fourthly-color);
  //  padding: 1.5em;
  //  width: 90%;
  //  text-align: center;
  //}

  //button:hover,
  //button:focus {
  //  background-color: var(--secondary-color);
  //  color: var(--fifthly-color);
  //}

  //a {
  //  color: var(--fifthly-color);
  //  text-decoration: none;
  //  text-transform: uppercase;
  //  font-size: 150%;
  //  font-weight: bold;
  //}

  h3 {
    font-family: "Lucida Calligraphy", sans-serif;
    font-size: 2em;
    color: var(--fourthly-color);
  }
`

const Button = styled.button`
  background-color: var(--secondary-color);
  border: 2px solid var(--fifthly-color);
  border-radius: 10px;
  box-shadow: 1.5px 2px 1.5px 2px var(--fourthly-color);
  padding: 1.5em;
  width: 90%;
  text-align: center;

  &:hover {
    background-color: var(--fourthly-color);
    //color: var(--secondary-color);
  }
  
  a {
    color: var(--fifthly-color);
    text-decoration: none;
    text-transform: uppercase;
    font-size: 150%;
    font-weight: bold;
  }
`