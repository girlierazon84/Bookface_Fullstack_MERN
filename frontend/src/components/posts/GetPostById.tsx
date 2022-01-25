import { useState } from 'react'
import { JsonToTable } from 'react-json-to-table'
import styled from 'styled-components'
import {PostDataObject} from "../../utils/interface/PostInterface";
import PostService from "../../utils/api/service/PostService";

function GetPostById() {
    const [onePost, setOnePost] = useState<PostDataObject>()
    const [id, setId] = useState<string>('')

    function getPosts() {
        PostService.getPostById(id)
            .then(function (response) {
                console.log(response.data)
                setOnePost(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function clearInputs() {
        setId('');
        setOnePost(undefined);
    }

    return (
        <Article>
            <H1>Get Post by ID</H1>
            <Input type='text'
                   placeholder='ID'
                   value={ id }
                   onChange={ event => setId(event.target.value) }/>
            <JsonToTable json={ onePost }/>
            <br/>
            <GridContainer>
                <Button className='getPostById__btn' onClick={ getPosts }>Get Post By ID</Button>
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
  margin-bottom: 1em;
  padding: 1em;
  border-radius: 10px;
  font-size: 1em;
`

const GridContainer = styled.div`
  display: inline-block;
  width: 100%;

  .getPostById__btn {
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

export default GetPostById
