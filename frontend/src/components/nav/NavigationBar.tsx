import React from 'react';
import styled from 'styled-components';
import Burger from './Burger';
import {Link} from "react-router-dom";
import RoutingPath from "../../routes/RoutingPath";
import BookfaceLogo from "../../utils/images/Bookface_circle_logo.png";


const NavigationBar: React.FC = () => {
    const [open, setOpen] = React.useState(false)

    return (
        <Nav>
            <Link to={RoutingPath.homeView}>
                <img className="bookface__logo" src={BookfaceLogo}
                     alt='Bookface Logo'/>
            </Link>
            <Burger open={open} setOpen={setOpen} />
        </Nav>
    )
}

export default NavigationBar

const Nav = styled.nav`
  width: 100%;
  height: 85px;
  background-color: var(--primary-color);
  border-bottom: 2px solid var(--fifthly-color);
  display: flex;
  justify-content: space-between;
  overflow: hidden;
  padding: 10px;

  .bookface__logo {
    width: 4em;
    border: 1px solid var(--fifthly-color);
    border-radius: 50px;
  }
`