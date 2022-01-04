import { useState } from 'react'
import { JsonToTable } from 'react-json-to-table'
import styled from 'styled-components'
import UserService from '../../utils/api/service/UserService'
import { UserDataObject } from '../../utils/interface/UsersInterfaces'

function GetUsersById() {
    const [oneUser, setOneUser] = useState<UserDataObject>()
    const [id, setId] = useState<string>('616718bda4ab77e25e33ec5b')

    function getUsers() {
        UserService.getUserById(id)
            .then(function (response) {
                console.log(response.data)
                setOneUser(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <Article>
            <H1>Get User by ID</H1>
            <Input type='text'
                       placeholder='ID'
                       value={ id }
                       onChange={ event => setId(event.target.value) }/>
            <JsonToTable json={ oneUser }/>
            <br/>
            <GridContainer>
                <Button className='getUserById__btn' onClick={ getUsers }>Get User By ID</Button>
                <Button className='clear__btn' onClick={ () => setOneUser(undefined) }>Clear</Button>
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
  margin-bottom: 1em;
  padding: 1em;
  border-radius: 10px;
  font-size: 1em;
`

const GridContainer = styled.div`
  display: inline-block;
  width: 100%;

  .getUserById__btn {
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

export default GetUsersById
