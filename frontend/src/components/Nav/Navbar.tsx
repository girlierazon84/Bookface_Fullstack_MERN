import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'
import BookfaceLogo from '../../utils/images/Bookface_circle_logo.png'
import RoutingPath from "../../routes/RoutingPath";
import Burger from "./Burger";

const Navbar = () => {
    return (
        <>
            <Nav>
                <Link to={RoutingPath.apiAliveView}>
                    <img className="bookface__logo" src={BookfaceLogo}
                         alt='Bookface Logo'/>
                </Link>
                <Burger/>
            </Nav>
        </>
    )
}

export default Navbar

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
    border: 1px solid gold;
    border-radius: 50px;
    //padding: 0.3em;
  }
`
//
//.search__input {
//  padding-right: 45em;
//  padding-top: 12px;
//}
//
//input {
//  background-color: var(--fifthly-color);
//  border: none;
//  border-radius: 15px;
//  padding: 0.8em;
//  max-width: 20em;
//  margin: 0;
//}

//
//.search__image {
//  width: 2.2em;
//  height: 2em;
//  padding-right: 10em;
//  padding-bottom: 0;
//  padding-top: 0.8em;
//}
// `


// const LiLeft = styled.li`
//   float: left;
//   padding: 10px;
//   text-transform: uppercase;
//   font-weight: 400;
// `

// const Li = styled.li`
//   float: left;
//
// `

// const LiRight = styled.li`
//   float: right;
//   padding: 2.3em 1.5em 0 0;
//   width: inherit;
//   text-transform: uppercase;
//   font-weight: 400;

//   a {
//     display: block;
//     color: var(--fourthly-color);
//     text-align: center;
//     padding: 0 1em 1em 0;
//     text-decoration: none;
//   }
//
//   a:hover {
//     background-color: var(--fifthly-color);
//     margin: 0;
//     padding: 10px;
//     border-radius: 10px;
//   }
// `

