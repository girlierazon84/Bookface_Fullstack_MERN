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
  position: sticky;
  top: 0;
  z-index: 50;

  width: 100%;
  border-bottom: 1px solid rgba(97, 97, 97, 0.18);

  /* modern glass */
  background: ${({ theme }) => theme.colors.fourthly};
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
`;

const Inner = styled.div`
  height: 72px;
  width: min(1100px, 92%);
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 0;
`;

const BrandLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: inherit;
`;

const LogoTile = styled.span`
  border: none;
  display: grid;
  place-items: center;

  img {
    width: 44px;
    height: 44px;
    object-fit: contain;
    display: block;
  }
`;

const Title = styled.span`
  font-weight: 900;
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 1.1rem;
  letter-spacing: 0.2px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  @media (max-width: 520px) {
    display: none;
  }
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

/**----------------------
    Component
-------------------------*/
const NavigationBar: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const location = useLocation();

  // Close drawer on route change
  React.useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  return (
    <Nav>
      <Inner>
        <Left>
          <BrandLink to={RoutingPath.homeView} aria-label="Go to home">
            <LogoTile aria-hidden="true">
              <img src={logo} alt="" />
            </LogoTile>
            <Title>Bookface</Title>
          </BrandLink>
        </Left>

        <Right>
          <Burger open={open} setOpen={setOpen} />
        </Right>
      </Inner>
    </Nav>
  );
};

export default NavigationBar;
