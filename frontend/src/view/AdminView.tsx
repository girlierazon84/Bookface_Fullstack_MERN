// frontend/src/view/AdminView.tsx

import React from "react";
import styled from "styled-components";

import Alive from "../components/users/Alive";
import GetAllUsers from "../components/users/GetAllUsers";
import GetUsersById from "../components/users/GetUsersById";
import UpdateUser from "../components/users/UpdateUser";
import DeleteUser from "../components/users/DeleteUser";

import GetAllPosts from "../components/posts/GetAllPosts";
import GetPostById from "../components/posts/GetPostById";
import UpdatePost from "../components/posts/UpdatePost";
import DeletePostById from "../components/posts/DeletePostById";


const AdminView: React.FC = () => {
  return (
    <Wrapper>
      <Alive />
      <Hr />

      <GetAllUsers />
      <Hr />

      <GetUsersById />
      <Hr />

      <UpdateUser />
      <Hr />

      <DeleteUser />
      <Hr />

      <GetAllPosts />
      <Hr />

      <GetPostById />
      <Hr />

      <UpdatePost />
      <Hr />

      <DeletePostById />
    </Wrapper>
  );
};

export default AdminView;

const Wrapper = styled.div`
  background-color: var(--primary-color);
  display: grid;
  gap: 1.25rem;
  padding: 3rem 1rem 1rem;
`;

const Hr = styled.hr`
  border: 1px dashed var(--fourthly-color);
  width: 100%;
`;
