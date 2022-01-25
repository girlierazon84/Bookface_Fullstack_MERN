import { useState } from 'react'
import { JsonToTable } from 'react-json-to-table'
import styled from 'styled-components'
import {CreatePostObject, PostDataObject} from "../../utils/interface/PostInterface";
import PostService from "../../utils/api/service/PostService";


function UpdatePost() {
    const [postObject, setPostObject] = useState<PostDataObject>()
    const [id, setId] = useState<string>('')
    const [author, setAuthor] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')

    function updatePost() {
        const payload: CreatePostObject = {
            author: author,
            title: title,
            content: content
        }
        PostService.updatePost(id, payload)
            .then(function (response) {
                console.log(response.data)
                setPostObject(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function clearInputs() {
        setId('');
        setAuthor('');
        setTitle('');
        setContent('');
        setPostObject(undefined);
    }

    return (
        <Article>
            <H1>Update Post</H1>

            <div>
                ID:
                <Input type='text'
                       value={ id }
                       onChange={ event => setId(event.target.value) }/>
            </div>

            <div>
                Author:
                <Input type='text'
                       value={ author }
                       onChange={ event => setAuthor(event.target.value) }/>
            </div>

            <div>
                Title:
                <Input type='text'
                       value={ title }
                       onChange={ event => setTitle(event.target.value) }/>
            </div>

            <div>
                Content:
                <TextArea value={ content }
                          onChange={ event => setContent(event.target.value) }/>
            </div>
            <JsonToTable json={ postObject } />
            <br/>
            <GridContainer>
                <Button className='update__btn' onClick={ updatePost }>Update Post</Button>
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

const TextArea = styled.textarea`
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

export default UpdatePost