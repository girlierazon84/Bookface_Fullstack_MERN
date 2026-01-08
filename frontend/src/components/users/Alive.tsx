// frontend/src/components/users/Alive.tsx

import React, { useState } from "react";
import styled from "styled-components";
import http from "../../utils/api/http";


const Alive: React.FC = () => {
  const [text, setText] = useState("");

  const alive = async () => {
    try {
      const res = await http.get<string>("/");
      setText(res.data);
    } catch {
      setText("Error");
    }
  };

  return (
    <Article>
      <H1>Check Server Status</H1>
      <h2>{text}</h2>

      <GridContainer>
        <Button type="button" className="alive__btn" onClick={alive}>
          Alive
        </Button>
        <Button type="button" className="clear__btn" onClick={() => setText("")}>
          Clear
        </Button>
      </GridContainer>
    </Article>
  );
};

export default Alive;

const Article = styled.article`
  padding: 1em;
  border: 1px solid var(--thirdly-color);
  box-shadow: 0 10px 8px 5px var(--fourthly-color);
  border-radius: 1em;
  background-color: var(--thirdly-color);
  margin-top: 2em;

  h2 {
    text-align: center;
    font-family: "Oleo Script", sans-serif;
    color: var(--secondary-color);
    min-height: 24px;
  }
`;

const H1 = styled.h1`
  font-size: 2em;
  color: var(--fourthly-color);
  font-family: "Oxygen - Regular", sans-serif;
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
