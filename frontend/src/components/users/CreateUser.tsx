// noinspection DuplicatedCode

import { useState } from 'react'
import { JsonToTable } from 'react-json-to-table'
import styled from 'styled-components'
import UsersService from '../../utils/api/service/UserService'
import { CreateUserObject, UserDataObject } from '../../utils/interface/UsersInterfaces'


function CreateUser() {
    const [userObject, setUserObject] = useState<UserDataObject>()
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [passWord, setPassWord] = useState<string>('')
    const [gender, setGender] = useState<string>('')
    const [birthDate, setBirthDate] = useState<string>('')


    function createUsers() {
        const payload: CreateUserObject = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            username: userName,
            password: passWord,
            gender: gender,
            birthdate: birthDate
        }
        UsersService.createUser(payload)
            .then(function (response) {
                console.log(response.data)
                setUserObject(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <Article>
            <H1>Create User</H1>

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
                <Input type='email'
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
                       onChange={ event => setPassWord(event.target.value) }/>
            </div>

            <div>
                Gender:
                <Input type='text'
                       value={ gender }
                       onChange={ event => setGender(event.target.value) }/>
            </div>

            <div>
                Birthdate:
                <Input type='date'
                       value={ birthDate }
                       onChange={ event => setBirthDate(event.target.value) }/>
            </div>

            <div>
                <Button onClick={ createUsers }>createUser</Button>
                <Button onClick={ () => setUserObject(undefined) }>clear</Button>
            </div>
            <JsonToTable json={ userObject }/>
        </Article>
    )
}


const Article = styled.article`
  padding: 1em;
  border: 1px solid black;
  border-radius: 1em;
  background-color: pink;
  align-self: center;
`

const H1 = styled.h1`
  font-size: 2em;
`

const Input = styled.input`
  width: 200px;
  margin-bottom: 1em;
`

const Button = styled.button`
  padding: 0.75em 3em;
  border-radius: 1em;
  background-color: greenyellow;
  color: blueviolet;
  border-color: blueviolet;
  margin-right: 1em;

  &:hover {
    background-color: blueviolet;
    color: greenyellow;
    border-color: greenyellow;
  }
`

export default CreateUser