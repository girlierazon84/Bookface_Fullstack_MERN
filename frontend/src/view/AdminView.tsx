import React from 'react'
import styled from 'styled-components'
import GetAllUsers from "../components/users/GetAllUsers";
import DeleteUser from "../components/users/DeleteUser";
import UpdateUser from "../components/users/UpdateUser";
import Alive from "../components/users/Alive";
import GetUsersById from "../components/users/GetUsersById";
import GetAllPosts from "../components/posts/GetAllPosts";
import GetPostById from "../components/posts/GetPostById";
import UpdatePost from "../components/posts/UpdatePost";
import DeletePostById from "../components/posts/DeletePostById";

const AdminView = () => {
    return (
        <Wrapper>
            <Alive/>
            <br/>
            <hr className='hr'/>
            <GetAllUsers/>
            <br/>
            <hr className='hr'/>
            <GetUsersById/>
            <br/>
            <hr className='hr'/>
            <UpdateUser/>
            <br/>
            <hr className='hr'/>
            <DeleteUser/>
            <hr className='hr'/>
            <br/>
            <GetAllPosts/>
            <br/>
            <hr className='hr'/>
            <GetPostById/>
            <br/>
            <hr className='hr'/>
            <UpdatePost/>
            <br/>
            <hr className='hr'/>
            <DeletePostById/>
        </Wrapper>
    )
}

export default AdminView

const Wrapper = styled.div`
  background-color: var(--primary-color);
  display: grid;
  grid-gap: 1em;
  padding: 0 1em 1em 1em;

  &:first-child {
    padding-top: 3em;
  }

  .hr {
    border: 1px dashed var(--fourthly-color);
    width: 100%;
  }
`