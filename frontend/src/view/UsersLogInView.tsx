import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {PrimaryButton} from '../components/CustomButtonComponent'
import RoutingPath from '../routes/RoutingPath'
import UserService from '../utils/api/service/UserService'
import {useUserContext} from '../utils/global/provider/UserProvider'
import { UsersLogInDataObject } from '../utils/interface/UsersInterfaces'


export const UsersLogInView = () => {
    const [userName, setUserName] = useState<string>('')
    const [passWord, setPassWord] = useState<string>('')
    const [loginText, setLoginText] = useState<string>('')
    const {setAuthenticatedUser} = useUserContext()

    const navigate = useNavigate()

    const verifyUser = () => {
        const payload: UsersLogInDataObject = {
            username: userName,
            password: passWord,
        }

        UserService.verifyUser(payload)
            .then(function (response) {
                console.log(response.data.message)
                login(response.data.message)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    const login = (apiResponse: boolean) => {
        if (apiResponse) {
            setAuthenticatedUser(userName)
            localStorage.setItem('username', userName)
            navigate(RoutingPath.profileView)
        } else {
            setLoginText('Wrong username or password')
        }
    }

    return (
        <Wrapper>
            <h1>Bookface</h1>
            <GridContainer>
                <h4>Log in here...</h4>
                <input type='text' placeholder='Username' onChange={event => setUserName(event.target.value)}/>
                <input type='password' placeholder='Password' onChange={event => setPassWord(event.target.value)}/>
            </GridContainer>
            <br/>
            <H3>{loginText}</H3>
            <PrimaryButton onClick={() => verifyUser()} children={'Log In'}/>
            <br/>
            <H4>No account yet?  <Link to='/sign_up'>Sign Up</Link>  here!...</H4>
        </Wrapper>
    )
}

export default UsersLogInView

const Wrapper = styled.section`
  background-color: var(--primary-color);
  text-align: center;
  padding: 5% 5% 20% 5%;

  h1 {
    font-weight: bold;
    font-size: 3.7em;
    font-family: 'Oxygen - Regular', sans-serif;
    color: var(--secondary-color);
  }
`

const GridContainer = styled.div`
  display: grid;
  background-color: var(--fifthly-color);
  border: 1px solid var(--fifthly-color);
  box-shadow: 5px 10px 8px 5px var(--fourthly-color);
  border-radius: 20px;
  padding: 0 2em 3.5em 2em;
  grid-gap: 2.5em;
  
  h4 {
    color: var(--fourthly-color);
    font-family: "Lucida Calligraphy", sans-serif;
    font-weight: bold;
    width: 100%;
    text-align: left;
  }
  
  input {
    width: 100%;
    height: 6.5vh;
    border: none;
    box-shadow: 2px 4px 3px 2px var(--fourthly-color);
    border-radius: 10px;
    padding-left: 20px;
    font-size: 1em;
  }
`

const H3 = styled.h3`
  color: red;
  font-weight: bold;
`

const H4 = styled.h4`
  color: var(--fourthly-color);
  font-weight: 700;
`