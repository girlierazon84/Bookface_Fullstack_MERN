import { useState } from 'react'
import { JsonToTable } from 'react-json-to-table'
import styled from 'styled-components'
import UserService from '../../utils/api/service/UserService'
import { UserDataObject } from '../../utils/interface/UsersInterfaces'

function GetAllUsers() {
    const initialState: Array<UserDataObject> = []
    const [allUsersInDatabase, setAllUsersInDatabase] = useState<Array<UserDataObject>>(initialState)
    const [text, setText] = useState<string>('')


    function getUsers() {
        UserService.getAllUsers()
            .then(function (response) {
                console.log(response.data)
                setAllUsersInDatabase(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <Article>
            <H1>Get All Users from Database</H1>
            <JsonToTable json={ allUsersInDatabase } max-width="100%" />
            <br/>
            <GridContainer>
                <Button className='getAllUsers__btn' onClick={ getUsers }>Get All Users</Button>
                <Button className='clear__btn' onClick={ () => setAllUsersInDatabase(initialState) }>Clear</Button>
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
  font-family: 'Oxygen - Regular', sans-serif;
`

const GridContainer = styled.div`
  display: inline-block;
  width: 100%;

  .getAllUsers__btn {
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

export default GetAllUsers