import React from 'react'
import styled from 'styled-components'
import GetAllUsers from "../components/users/GetAllUsers";
import DeleteUser from "../components/users/DeleteUser";
import UpdateUser from "../components/users/UpdateUser";
import Alive from "../components/users/Alive";
import GetUsersById from "../components/users/GetUsersById";

const AdminView = () => {
    return (
        <Wrapper>
            <Alive/>
            <GetAllUsers/>
            <GetUsersById/>
            <UpdateUser/>
            <DeleteUser/>
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
    padding-top: 1em;
  }
`