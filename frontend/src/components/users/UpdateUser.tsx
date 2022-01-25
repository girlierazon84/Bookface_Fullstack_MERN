import { useState } from 'react'
import { JsonToTable } from 'react-json-to-table'
import styled from 'styled-components'
import UserService from '../../utils/api/service/UserService'
import { CreateUserObject, UserDataObject } from '../../utils/interface/UsersInterfaces'


function UpdateUser() {
    const [userObject, setUserObject] = useState<UserDataObject>()
    const [id, setId] = useState<string>('')
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [userName, setUserName] = useState<string>('')
    const [passWord, setPassWord] = useState<string>('')

    function updateUser() {
        const payload: CreateUserObject = {
            firstname: firstName,
            lastname: lastName,
            email: email,
            username: userName,
            password: passWord
        }
        UserService.updateUser(id, payload)
            .then(function (response) {
                console.log(response.data)
                setUserObject(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function clearInputs() {
        setId('')
        setFirstName('');
        setLastName('');
        setEmail('');
        setUserName('');
        setPassWord('');
        setUserObject(undefined);
    }

    return (
        <Article>
            <H1>Update User</H1>

            <div>
                ID:
                <Input type='text'
                       value={ id }
                       onChange={ event => setId(event.target.value) }/>
            </div>

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
            <JsonToTable json={ userObject } />
            <br/>
            <GridContainer>
                <Button className='update__btn' onClick={ updateUser }>Update User</Button>
                <Button className='clear__btn' onClick={ () => clearInputs() }>Clear</Button>
            </GridContainer>
        </Article>
    )
}


const Article = styled.article`
  padding: 1em;
  border: 1px solid var(--thirdly-color);
  box-shadow: 0 10px 8px 5px var(--fourthly-color);
  border-radius: 1em;
  background-color: var(--thirdly-color);
  margin-top: 2em;
`

const H1 = styled.h1`
  font-size: 2em;
  color: var(--fourthly-color);
  font-family: "Oxygen - Regular", sans-serif;
`

const Input = styled.input`
  background-color: var(--fifthly-color);
  width: 100%;
  padding: 1em;
  border-radius: 10px;
  margin-bottom: 1em;
  font-size: 1em;
`

const GridContainer = styled.div`
  display: inline-block;
  width: 100%;

  .update__btn {
    float: left;

  }

  .clear__btn {
    float: right;
  }
`

const Button = styled.button` 
  width: 50%;
  text-transform: uppercase;
  font-family: "Oxygen - Regular", sans-serif;
  font-size: 1em;
  font-weight: bold;
  padding: 10px;
  border-radius: 0.8em;
  background-color: var(--secondary-color);
  color: var(--fifthly-color);
  border-color: var(--fifthly-color);

  &:hover {
    background-color: var(--fifthly-color);
    color: var(--secondary-color);
  }
`

export default UpdateUser