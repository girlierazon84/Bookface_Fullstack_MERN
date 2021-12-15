import React from 'react';
import {Link, Outlet} from "react-router-dom";
import {ListItemIcon} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import PeopleAltSharpIcon from "@mui/icons-material/PeopleAltSharp";
import ForumSharpIcon from "@mui/icons-material/ForumSharp";
import {useUserContext} from '../../utils/global/provider/UserProvider'
import Profile from '../Profile'
import RoutingPath from '../../routes/RoutingPath'
import styled from "styled-components";


export const RightNav = () => {
    const {authenticatedUser} = useUserContext()

    const displayUserIfAuthenticated = () => {
        return (authenticatedUser)
            ? <li><Link to={RoutingPath.profileView}><Profile/></Link></li>
            : <li><Link to={RoutingPath.logInView}><ListItemIcon><ListItemText primary='Log in'/><LoginSharpIcon
                color='action' fontSize='medium'/></ListItemIcon></Link></li>
    }

    return (
        <>
            <Ul>
                {/*<li><Link to={RoutingPath.friendsListView}><ListItemIcon><ListItemText*/}
                {/*    primary='Friends List'/><PeopleAltSharpIcon*/}
                {/*    color='success'*/}
                {/*    fontSize='medium'*/}
                {/*    padding-top='inherit'/></ListItemIcon></Link></li>*/}

                <li><Link to={RoutingPath.privateMessageView}><ListItemIcon><ListItemText
                    primary='Messages'/><ForumSharpIcon
                    color='primary'
                    fontSize='small'
                    padding-top='inherit'/></ListItemIcon></Link></li>

                <li><Link to={RoutingPath.homeView}><ListItemIcon><ListItemText
                    primary='Home'/><HomeSharpIcon
                    color='primary'
                    fontSize='medium'
                    padding-top='inherit'/></ListItemIcon></Link></li>

                {displayUserIfAuthenticated()}
            </Ul>
            <Outlet/>
        </>
    );
}

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  width: 30%;
  
  li {
    padding: 2px 15px;
  }
  
  a {
    text-decoration: none;
    text-transform: uppercase;
    color: var(--fourthly-color);
    font-weight: 700;
  }
  
  @media (max-width: 768px) {
    flex-flow: column nowrap;
    background-color: var(--thirdly-color);
    position: fixed;
    margin: 0;
    top: 0;
    right: 0;
    height: 40vh;
    width: 300px;
    padding-top: 4rem;
    transition: transform 0.3s ease-in-out;
    
    li {
      color: var(--fourthly-color);
    }
  }
`