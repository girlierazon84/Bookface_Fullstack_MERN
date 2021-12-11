import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import {PrimaryButton} from '../components/CustomButtonComponent'
import RoutingPath from '../routes/RoutingPath'
import UserService from '../utils/api/service/UserService'
import {useUserContext} from '../utils/global/provider/UserProvider'
import {CreateUserObject} from '../utils/interface/UsersInterfaces'

export const SignInView = () => {
    const [firstName] = useState<string>('')
    const [lastName] = useState<string>('')
    const [email] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [passWord, setPassWord] = useState<string>('')
    const [gender] = useState<string>('')
    const [birthDate] = useState<string>('')
    const [loginText, setLoginText] = useState<string>('')
    const {authenticatedUser, setAuthenticatedUser} = useUserContext()

    const navigate = useNavigate()

    const verifyUser = () => {
        const payload: CreateUserObject = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            username: userName,
            password: passWord,
            gender: gender,
            birthdate: birthDate
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
            navigate(RoutingPath.homeView)
        } else {
            setLoginText('Wrong username or password')
        }
    }

    return (
        <Wrapper>
            <h1>Bookface</h1>
            <GridContainer>
                <h4>Log in</h4>
                <br/>
                <br/>
                <br/>
                <Span>Username: </Span>
                <input type='text' onChange={event => setUserName(event.target.value)}/>
                <Span>Password: </Span>
                <input type='password' onChange={event => setPassWord(event.target.value)}/>
            </GridContainer>
            <br/>
            <H3>{loginText}</H3>
            <PrimaryButton onClick={() => verifyUser()} children={'Log In'}/>
            <PrimaryButton onClick={() => alert(authenticatedUser)} children={'Show user'}/>
            <br/>
            <br/>
        </Wrapper>
    )
}

export default SignInView

const Wrapper = styled.section`
  background-color: var(--primary-color);
  text-align: center;
  padding: 25% 0 25% 0;
  
  h1 {
    font-weight: bold;
  }
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  background-color: var(--fifthly-color);
  border: 1px solid var(--fifthly-color);
  border-radius: 20px;
  padding-top: 1em;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 1em;
  grid-gap: 5px;
`

const Span = styled.span`

`

const H3 = styled.h3`
  color: red;
  font-weight: bold;
`