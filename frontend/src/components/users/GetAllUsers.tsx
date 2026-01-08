// frontend/src/components/users/GetAllUsers.tsx

import React, { useState } from "react";
import { JsonToTable } from "react-json-to-table";
import styled from "styled-components";
import UserService from "../../utils/api/service/UserService";
import type { UserDataObject } from "../../utils/interface/UsersInterfaces";


const GetAllUsers: React.FC = () => {
  const [allUsersInDatabase, setAllUsersInDatabase] = useState<UserDataObject[]>([]);

  const getUsers = async () => {
    try {
      const res = await UserService.getAllUsers();
      setAllUsersInDatabase(res.data);
    } catch {
      setAllUsersInDatabase([]);
    }
  };

  return (
    <Article>
      <H1>Get All Users from Database</H1>

      <JsonToTable json={allUsersInDatabase} />

      <GridContainer>
        <Button type="button" onClick={getUsers}>
          Get All Users
        </Button>
        <Button type="button" onClick={() => setAllUsersInDatabase([])}>
          Clear
        </Button>
      </GridContainer>
    </Article>
  );
};

export default GetAllUsers;

const Article = styled.article`
  padding: 1em;
  border: 1px solid var(--thirdly-color);
  box-shadow: 0 10px 8px 5px var(--fourthly-color);
  border-radius: 1em;
  background-color: var(--thirdly-color);
`;

const H1 = styled.h1`
  font-size: 2em;
  color: var(--fourthly-color);
  font-family: "Oxygen - Regular", sans-serif;
`;

const GridContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
`;

const Button = styled.button`
  width: 100%;
  text-transform: uppercase;
  font-family: "Oxygen - Regular", sans-serif;
  font-size: 1em;
  font-weight: bold;
  padding: 10px;
  border-radius: 0.8em;
  background-color: var(--secondary-color);
  color: var(--fifthly-color);
  border: 1px solid var(--fifthly-color);
  cursor: pointer;

  &:hover {
    background-color: var(--fifthly-color);
    color: var(--secondary-color);
  }
`;
