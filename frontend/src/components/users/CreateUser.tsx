import React, { useState } from 'react'
import styled from 'styled-components'
import UsersService from '../../utils/api/service/UserService'
import {CreateUserObject} from '../../utils/interface/UsersInterfaces'
import {PrimaryButton} from "../CustomButtonComponent"
import {Link} from "react-router-dom"


function CreateUser() {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [passWord, setPassWord] = useState<string>('')

    function createUsers() {
        const payload: CreateUserObject = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            username: userName,
            password: passWord,
        }
        UsersService.createUser(payload)
            .then(function (response) {
                console.log(response.data)
                alert('Congratulations you are successfully registered!')
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function clearInputs() {
        setFirstName('');
        setLastName('');
        setEmail('');
        setUserName('');
        setPassWord('');
    }

    return (
        <>
            <H1>Sign Up</H1>
            <Article>
                <div>
                    Firstname:
                    <Input type='text'
                           value={ firstName }
                           onChange={ event => setFirstName(event.target.value) }/>
                </div>

                <div>
                    Lastname:
                    <Input type='text'
                           value={ lastName }
                           onChange={ event => setLastName(event.target.value) }/>
                </div>

                <div>
                    Email:
                    <Input type='text'
                           value={ email }
                           onChange={ event => setEmail(event.target.value) }/>
                </div>

                <div>
                    Username:
                    <Input type='text'
                           value={ userName }
                           onChange={ event => setUserName(event.target.value) }/>
                </div>

                <div>
                    Password:
                    <Input type='password'
                           value={ passWord }
                           onChange={ event => setPassWord(event.target.value) } />
                </div>
            </Article>
            <br/>
            <br/>
            <GridContainer>
                <div className='submit__btn'>
                    <Link to={'/log_in'}>
                        <PrimaryButton onClick={() => createUsers()} children={'Submit'}/>
                    </Link>
                </div>
                <div className='clear__btn'>
                    <PrimaryButton onClick={() => clearInputs()} children={'Clear'}/>
                </div>
            </GridContainer>

            <H4>Already have an account?  <Link to='/log_in'>Log in</Link>  here!...</H4>
        </>
    )
}

const Article = styled.article`
  padding: 5%;
  border: 1px solid var(--thirdly-color);
  box-shadow: 5px 10px 8px 5px var(--fourthly-color);
  border-radius: 1em;
  background-color: var(--thirdly-color);
  align-self: center;
  width: 100%;
`

const H1 = styled.h1`
  font-size: 2em;
  font-family: 'Oxygen - Regular', sans-serif;
  color: var(--fourthly-color);
  text-align: center;
`

const Input = styled.input`
  padding: 0.75em 3em;
  font-family: 'Oxygen - Regular', sans-serif;
  font-size: 1em;
  width: 100%;
  margin-bottom: 2em;
  border-radius: 5px;
  border: 1px solid var(--fifthly-color);
`

const GridContainer = styled.div`
  display: inline-block;
  width: 100%;
  
  .submit__btn {
    float: left;
  }
  
  .clear__btn {
    float: right;
  }
`

const H4 = styled.h4`
  color: var(--fourthly-color);
  font-weight: 700;
  text-align: center;
`

export default CreateUser