// frontend/src/components/nav/NavigationBar.tsx

import React from "react";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

import Burger from "./Burger";
import RoutingPath from "../routes/RoutingPath";
import logo from "../assets/logo.png";


/**----------------------
    Styled Components
-------------------------*/
const Nav = styled.nav`
  width: 100%;
  height: 72px;
  background-color: ${({ theme }) => theme.colors.primary};
  border-bottom: 1px solid rgba(97, 97, 97, 0.2);

  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px 14px;

  position: sticky;
  top: 0;
  z-index: 50;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .bookface__logo {
    width: 44px;
    height: 44px;
    border: 1px solid rgba(97, 97, 97, 0.2);
    border-radius: 14px;
    display: block;
    background: ${({ theme }) => theme.colors.primary};
    object-fit: cover;
  }
`;

const Title = styled.div`
  font-weight: 900;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.1rem;

  @media (max-width: 520px) {
    display: none;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
`;

// Navigation bar component export
const NavigationBar: React.FC = () => {
  // State to manage burger menu open/close status
  const [open, setOpen] = React.useState(false);
  // Get current location to handle navigation changes
  const location = useLocation();

  // Close the drawer after navigation
  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <Nav>
      <Left>
        <Link to={RoutingPath.homeView} aria-label="Go to home">
          <img className="bookface__logo" src={logo} alt="Bookface Logo" />
        </Link>
        <Title>Bookface</Title>
      </Left>

      <Right>
        <Burger open={open} setOpen={setOpen} />
      </Right>
    </Nav>
  );
};

export default NavigationBar;
