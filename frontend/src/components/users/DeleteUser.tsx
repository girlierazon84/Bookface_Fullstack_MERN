import { useState } from 'react'
import styled from 'styled-components'
import UsersService from '../../utils/api/service/UserService'

function DeleteUser() {
    const [text, setText] = useState<string>('')
    const [id, setId] = useState<string>('')

    function deleteUser() {
        UsersService.deleteUserById(id)
            .then(function (response) {
                console.log(response.data)
                setText(response.data.message)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    return (
        <Article>
            <H1>Delete User</H1>

            <div>
                <Input type='text'
                       placeholder='ID'
                       value={ id }
                       onChange={ event => setId(event.target.value) }/>
            </div>

            <h3>{ text }</h3>
            <GridContainer>
                <Button className='delete__btn' onClick={ deleteUser }>Delete User</Button>
                <Button className='clear__btn' onClick={ () => setText('') }>Clear</Button>
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
  margin: 2em 0 5em 0;
  
  h3 {
    color: var(--secondary-color);
    font-family: "Oleo Script", sans-serif;
  }
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

export default DeleteUser