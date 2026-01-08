// frontend/src/components/users/DeleteUser.tsx

import { useState } from "react";
import styled from "styled-components";
import UserService from "../../utils/api/service/UserService";


type DeleteResponse = { message?: string };

const DeleteUser: React.FC = () => {
  const [text, setText] = useState("");
  const [id, setId] = useState("");

  const deleteUser = async () => {
    try {
      const res = await UserService.deleteUserById(id);
      const data = res.data as DeleteResponse;
      setText(data?.message ?? "User deleted");
    } catch {
      setText("Delete failed");
    }
  };

  const clearInputs = () => {
    setId("");
    setText("");
  };

  return (
    <Article>
      <H1>Delete User</H1>

      <Input placeholder="ID" value={id} onChange={(e) => setId(e.target.value)} />

      <h3>{text}</h3>

      <GridContainer>
        <Button type="button" onClick={deleteUser}>
          Delete User
        </Button>
        <Button type="button" onClick={clearInputs}>
          Clear
        </Button>
      </GridContainer>
    </Article>
  );
};

export default DeleteUser;

const Article = styled.article`
  padding: 1em;
  border: 1px solid var(--thirdly-color);
  box-shadow: 0 10px 8px 5px var(--fourthly-color);
  border-radius: 1em;
  background-color: var(--thirdly-color);

  h3 {
    color: green;
    font-family: "Oleo Script", sans-serif;
    min-height: 24px;
  }
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
