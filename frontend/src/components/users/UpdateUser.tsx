// frontend/src/components/users/UpdateUser.tsx

import { useState } from "react";
import { JsonToTable } from "react-json-to-table";
import styled from "styled-components";
import UserService from "../../utils/api/service/UserService";
import type { UpdateUserObject, UserDataObject } from "../../utils/interface/UsersInterfaces";


const UpdateUser: React.FC = () => {
  const [userObject, setUserObject] = useState<UserDataObject | null>(null);
  const [id, setId] = useState("");

  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUserName] = useState("");
  const [password, setPassWord] = useState("");

  const updateUser = async () => {
    const payload: UpdateUserObject = {
      ...(firstname ? { firstname } : {}),
      ...(lastname ? { lastname } : {}),
      ...(email ? { email } : {}),
      ...(username ? { username } : {}),
      ...(password ? { password } : {})
    };

    try {
      const res = await UserService.updateUser(id, payload);
      setUserObject(res.data);
    } catch {
      setUserObject(null);
    }
  };

  const clearInputs = () => {
    setId("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setUserName("");
    setPassWord("");
    setUserObject(null);
  };

  return (
    <Article>
      <H1>Update User</H1>

      <Input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />
      <Input placeholder="Firstname" value={firstname} onChange={(e) => setFirstName(e.target.value)} />
      <Input placeholder="Lastname" value={lastname} onChange={(e) => setLastName(e.target.value)} />
      <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input placeholder="Username" value={username} onChange={(e) => setUserName(e.target.value)} />
      <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassWord(e.target.value)} />

      <JsonToTable json={userObject ?? {}} />

      <GridContainer>
        <Button type="button" onClick={updateUser}>
          Update User
        </Button>
        <Button type="button" onClick={clearInputs}>
          Clear
        </Button>
      </GridContainer>
    </Article>
  );
};

export default UpdateUser;

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
  padding: 1em;
  border-radius: 10px;
  margin-bottom: 1em;
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
