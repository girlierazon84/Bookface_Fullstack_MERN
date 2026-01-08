// frontend/src/components/users/GetUsersById.tsx

import { useState } from "react";
import { JsonToTable } from "react-json-to-table";
import styled from "styled-components";
import UserService from "../../utils/api/service/UserService";
import type { UserDataObject } from "../../utils/interface/UsersInterfaces";


const GetUsersById: React.FC = () => {
  const [oneUser, setOneUser] = useState<UserDataObject | null>(null);
  const [id, setId] = useState("");

  const getUser = async () => {
    try {
      const res = await UserService.getUserById(id);
      setOneUser(res.data);
    } catch {
      setOneUser(null);
    }
  };

  const clearInputs = () => {
    setId("");
    setOneUser(null);
  };

  return (
    <Article>
      <H1>Get User by ID</H1>

      <Input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />

      <JsonToTable json={oneUser ?? {}} />

      <GridContainer>
        <Button type="button" onClick={getUser}>
          Get User By ID
        </Button>
        <Button type="button" onClick={clearInputs}>
          Clear
        </Button>
      </GridContainer>
    </Article>
  );
};

export default GetUsersById;

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

const Input = styled.input`
  background-color: var(--fifthly-color);
  width: 100%;
  margin-bottom: 1em;
  padding: 1em;
  border-radius: 10px;
  font-size: 1em;
  border: 1px solid var(--fifthly-color);
`;

const GridContainer = styled.div`
  display: flex;
  gap: 10px;
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
