// frontend/src/components/nav/NavigationBar.tsx

import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

import Burger from "./Burger";
import RoutingPath from "../../routes/RoutingPath";
import BookfaceLogo from "../../utils/images/Bookface_circle_logo.png";


const NavigationBar: React.FC = () => {
  const [open, setOpen] = React.useState(false);

  return (
    <Nav>
      <Left>
        <Link to={RoutingPath.homeView} aria-label="Go to home">
          <img className="bookface__logo" src={BookfaceLogo} alt="Bookface Logo" />
        </Link>
      </Left>

      <Right>
        <Burger open={open} setOpen={setOpen} />
      </Right>
    </Nav>
  );
};

export default NavigationBar;

const Nav = styled.nav`
  width: 100%;
  height: 85px;
  background-color: var(--primary-color);
  border-bottom: 2px solid var(--fifthly-color);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;
  position: relative;
`;

const Left = styled.div`
  display: flex;
  align-items: center;

  .bookface__logo {
    width: 4em;
    border: 1px solid var(--fifthly-color);
    border-radius: 50px;
    display: block;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;
