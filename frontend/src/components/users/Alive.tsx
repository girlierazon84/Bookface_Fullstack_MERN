import React, {useState} from 'react'
import styled from 'styled-components'
import http from '../../utils/api/UsersApi'

function Alive() {
    const [text, setText] = useState<string>('')

    function alive() {
        http.get('/')
            .then(function (response) {
                console.log(response.data)
                setText(response.data)
            })
            .catch(function (error) {
                console.log(error)
                return 'Error'
            })
            .then(function () {
                // always execute
            })
    }

    return (
        <Article>
            <H1>Check Server Status!...</H1>
            <h2>{text}</h2>
            <GridContainer>
                <Button className='alive__btn' onClick={alive}>Alive</Button>
                <Button className='clear__btn' onClick={() => {
                    setText('')
                }}>Clear</Button>
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
  margin-top: 5em;
  
  h2 {
    text-align: center;
    font-family: 'Oleo Script', sans-serif;
    color: var(--secondary-color);
  }
`

const H1 = styled.h1`
  font-size: 2em;
  color: var(--fourthly-color);
  font-family: 'Oxygen - Regular', sans-serif;
`

const GridContainer = styled.div`
  display: inline-block;
  width: 100%;

  .alive__btn {
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

export default Alive