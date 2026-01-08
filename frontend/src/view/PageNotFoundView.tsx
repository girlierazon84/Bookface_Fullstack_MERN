// frontend/src/view/PageNotFoundView.tsx

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import RoutingPath from "../routes/RoutingPath";


const PageNotFoundView: React.FC = () => {
  return (
    <Article>
      <h1>Page not found! (404)</h1>
      <p>
        Go back to <Link to={RoutingPath.homeView}>Home</Link>
      </p>
    </Article>
  );
};

export default PageNotFoundView;

const Article = styled.article`
  background-color: var(--primary-color);
  padding: 5rem 1rem 18rem;

  h1,
  p {
    text-align: center;
  }
`;
