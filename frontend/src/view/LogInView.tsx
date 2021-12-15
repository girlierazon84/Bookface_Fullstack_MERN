import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {PrimaryButton} from '../components/CustomButtonComponent'
import RoutingPath from '../routes/RoutingPath'
import UserService from '../utils/api/service/UserService'
import {useUserContext} from '../utils/global/provider/UserProvider'
import { LogInDataObject } from '../utils/interface/UsersInterfaces'

export const LogInView = () => {
    const [userName, setUserName] = useState<string>('')
    const [passWord, setPassWord] = useState<string>('')
    const [loginText, setLoginText] = useState<string>('')
    const {authenticatedUser, setAuthenticatedUser} = useUserContext()

    const navigate = useNavigate()

    const verifyUser = () => {
        const payload: LogInDataObject = {
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
            {/*<PrimaryButton onClick={() => alert(authenticatedUser)} children={'Show user'}/>*/}
            {/*<br/>*/}
            <br/>
        </Wrapper>
    )
}

export default LogInView

const Wrapper = styled.section`
  background-color: var(--primary-color);
  text-align: center;
  padding: 5em 0 10em 0;

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
  padding: 0 2em 2em 2em;
  width: 50%;
  margin: auto;
  grid-gap: 20px;
  
  h4 {
    color: var(--fourthly-color);
    font-family: "Lucida Calligraphy", sans-serif;
    font-weight: bold;
    width: 100%;
    text-align: left;
  }
  
  input {
    width: 100%;
    height: 8vh;
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