import React, { useState } from 'react'
import styled from 'styled-components'
import {PrimaryButton} from "../CustomButtonComponent"
import {CreatePostObject, PostDataObject} from "../../utils/interface/PostInterface";
import PostService from "../../utils/api/service/PostService";
import {JsonToTable} from "react-json-to-table";
import {TextField} from "@mui/material";
import {useUserContext} from "../../utils/global/provider/UserProvider";


const CreateNewPost = () =>  {
    const [author, setAuthor] = useState<string>('')
    const [title, setTitle] = useState<string>('')
    const [content, setContent] = useState<string>('')
    const [postObject, setPostObject] = useState<PostDataObject>()
    const {authenticatedUser} = useUserContext()
    const imgUrl = 'https://thispersondoesnotexist.com/image'


    function createPosts() {
        const payload: CreatePostObject = {
            author: author,
            title: title,
            content: content,
        }
        PostService.createPost(payload)
            .then(function (response) {
                console.log(response.data)
                setPostObject(response.data)
            })
            .catch(function (error) {
                console.log(error)
            })
    }

    function clearInputs() {
        setAuthor('');
        setTitle('');
        setContent('');
        setPostObject(undefined);
    }

    return (
        <>
            <Article>
                <GridContainerOne>
                    <div className='image'>
                        <Img src={ imgUrl }/>
                    </div>
                    <div className='username'>
                        <SpanUserName>{ authenticatedUser }</SpanUserName>
                    </div>
                </GridContainerOne>
                <br/>
                <br/>
                <GridContainerTwo>
                    <div className='post_container'>
                        <TextField type='text'
                                   id="standard-basic"
                                   variant="standard"
                                   placeholder='Name'
                                   value={ author }
                                   onChange={ event => setAuthor(event.target.value) }/>
                        <br/>
                        <br/>
                        <br/>
                        <TextField type='text'
                                   id="standard-basic"
                                   variant="standard"
                                   placeholder='Title'
                                   value={ title }
                                   onChange={ event => setTitle(event.target.value) }/>
                        <br/>
                        <br/>
                        <br/>
                        <TextArea value={ content }
                                  onChange={ event => setContent(event.target.value) }/>
                    </div>
                </GridContainerTwo>
                <br/>
                <br/>
                <br/>
                <GridContainer>
                    <div className='submit__btn'>
                        <PrimaryButton onClick={() => createPosts()} children={'Submit'}/>
                    </div>
                    <div className='clear__btn'>
                        <PrimaryButton onClick={ () => clearInputs() } children={'Clear'}/>
                    </div>
                </GridContainer>
            </Article>
            <ArticleOne>
                <JsonToTable json={ postObject }/>
            </ArticleOne>
        </>
    )
}

export default CreateNewPost

const Article = styled.article`
  padding: 2%;
  border: 1px solid var(--thirdly-color);
  box-shadow: 5px 10px 8px 5px var(--fourthly-color);
  border-radius: 1em;
  background-color: var(--thirdly-color);
  align-self: center;
  width: 90%;
  height: 20%;
  margin: 5%;

  .username {
    background-color: inherit;
    border: none;
    color: var(--secondary-color);
    font-size: 0.6em;
    font-weight: 500;
  }

  .title {
    background-color: inherit;
    border: none;
  }
`

const GridContainerOne = styled.div`
  display: inline-flex;
  grid-gap: 1.5em;

  .username {
    padding-top: 1.5em;
  }
`

const Img = styled.img`
  display: inline-block;
  cursor: pointer;
  align-self: center;
  border-radius: 50%;
  width: 3em;
  border: 1px solid var(--thirdly-color);
`

const SpanUserName = styled.span`
  color: var(--secondary-color);
  font-size: 1em;
  font-weight: 500;
  padding-bottom: 5em;
`

const GridContainerTwo = styled.div`
  display: grid;
`

const TextArea = styled.textarea`
  background-color: inherit;
  width: 100%;
  padding: 1em;
  border-radius: 10px;
  margin-bottom: 1em;
  font-size: 1em;
  border: 1px solid var(--fourthly-color);
`

const GridContainer = styled.div`
  display: inline-block;
  width: 100%;

  .submit__btn {
    width: 40%;
    float: left;
  }

  .clear__btn {
    width: 40%;
    float: right;
  }
`

const ArticleOne = styled.article`
  padding: 5%;
  margin: 5%;
`






