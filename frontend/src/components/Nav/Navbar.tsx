import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import styled from 'styled-components'
import BookfaceLogo from '../../utils/images/Bookface_circle_logo.png'
import RoutingPath from "../../routes/RoutingPath";
import {useUserContext} from "../../utils/global/provider/UserProvider";
import Profile from "../Profile";
import {ListItemIcon} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import ForumSharpIcon from "@mui/icons-material/ForumSharp";

const Navbar = () => {
    const {authenticatedUser} = useUserContext()

    const displayUserIfAuthenticated = () => {
        return (authenticatedUser)
            ? <LiLeft><Profile/></LiLeft>
            : <LiLeft><Link to={RoutingPath.logInView}><ListItemIcon><ListItemText primary='Log in'/><LoginSharpIcon
                color='action' fontSize='medium'/></ListItemIcon></Link></LiLeft>
    }

    return (
        <>
            <Nav>
                <Link to={RoutingPath.apiAliveView}>
                    <img className="bookface__logo" src={BookfaceLogo}
                         alt='Bookface Logo'/>
                </Link>

                <Ul>
                    <LiRight><Link to={RoutingPath.homeView}><ListItemIcon><ListItemText
                        primary='Home'/><HomeSharpIcon
                        color='primary'
                        fontSize='medium'
                        padding-top='inherit'/></ListItemIcon></Link></LiRight>

                    <LiRight><Link to={RoutingPath.adminView}><ListItemIcon>
                        <ListItemText primary='Admin'/><AdminPanelSettingsIcon color='primary'
                                                                               fontSize='small'
                                                                               padding-top='inherit'/></ListItemIcon>
                    </Link></LiRight>

                    <LiRight><Link to={RoutingPath.privateMessageView}><ListItemIcon><ListItemText
                        primary='Messages'/><ForumSharpIcon
                        color='primary'
                        fontSize='small'
                        padding-top='inherit'/></ListItemIcon></Link></LiRight>

                    {displayUserIfAuthenticated()}
                </Ul>
                <Outlet/>
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

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: var(--primary-color);

  //@media (max-width: 768px) {
  //       flex-flow: column nowrap;
  //       display: grid;
  //       background-color: var(--thirdly-color);
  //       position: fixed;
  //       margin: 0;
  //       top: 0;
  //       right: 0;
  //       height: 60%;
  //       width: 300px;
  //       padding-top: 4em;
  //       transition: transform 0.3s ease-in-out;
`


const LiLeft = styled.li`
  float: left;
  width: 150px;
  
  a {
    display: block;
    color: var(--fourthly-color);
    text-align: center;
    padding: 16px;
    text-decoration: none;
  }

  a:hover {
    background-color: var(--fifthly-color);
    border-radius: 10px;
  }

  //@media (max-width: 768px) {
  //  padding-left: 30px;
  //  padding-bottom: 60px;
  //}
`

const LiRight = styled.li`
  float: right;

  a {
    display: block;
    color: var(--fourthly-color);
    text-align: center;
    padding: 16px 14px;
    text-decoration: none;
  }

  a:hover {
    background-color: var(--fifthly-color);
    border-radius: 10px;
  }

  //@media (max-width: 768px) {
  //  padding-right: 60px;
  //}
`

// const Ul = styled.ul`
//   list-style-type: none;
//   display: flex;
//   flex-flow: row nowrap;
//   width: 33%;
//
//   li {
//     padding: 2px 15px;
//   }
//
//   a {
//     text-decoration: none;
//     color: var(--fourthly-color);
//     font-weight: 700;
//   }
//
//   @media (max-width: 768px) {
//     flex-flow: column nowrap;
//     background-color: var(--thirdly-color);
//     position: fixed;
//     margin: 0;
//     top: 0;
//     right: 0;
//     height: 40vh;
//     width: 300px;
//     padding-top: 4rem;
//     transition: transform 0.3s ease-in-out;
//
//     li {
//       color: var(--fourthly-color);
//     }
//   }
// `
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

