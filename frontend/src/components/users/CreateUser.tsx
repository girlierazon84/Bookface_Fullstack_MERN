import { useState } from 'react'
// import { JsonToTable } from 'react-json-to-table'
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
                setUserObject(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
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
                    <Button onClick={ createUsers }>Submit</Button>
                    <Button onClick={ () => setUserObject(undefined) }>clear</Button>
                </div>
                {/*<JsonToTable json={ userObject }/>*/}
            </Article>
        </>

    )
}

const Article = styled.article`
  padding: 5%;
  border: 1px solid var(--thirdly-color);
  box-shadow: 5px 10px 8px 5px var(--fourthly-color);
  border-radius: 2em;
  background-color: var(--thirdly-color);
  align-self: center;
  width: 100%;
  height: 50%;
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

const Button = styled.button`
  cursor: pointer;
  padding: 3% 4%;
  border: none;
  border-radius: 0.5em;
  background-color: var(--secondary-color);
  font-family: 'Oxygen - Regular', sans-serif;
  font-size: 1em;
  font-weight: 700;
  color: var(--fifthly-color);
  margin-top: 10%;
  margin-left: 20.5%;
  text-transform: uppercase;
  

  &:hover {
    background-color: var(--fifthly-color);
    color: var(--secondary-color);
  }
`

export default CreateUser