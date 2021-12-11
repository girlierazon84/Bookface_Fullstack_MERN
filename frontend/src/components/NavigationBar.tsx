import React from 'react'
import {Link, Outlet} from 'react-router-dom'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import ListItemText from '@mui/material/ListItemText';
import {ListItemIcon} from "@mui/material";
import LoginSharpIcon from '@mui/icons-material/LoginSharp';
import ForumSharpIcon from '@mui/icons-material/ForumSharp';
import PeopleAltSharpIcon from '@mui/icons-material/PeopleAltSharp';
import HomeSharpIcon from '@mui/icons-material/HomeSharp';
import BookfaceLogo from '../utils/images/Bookface_circle_logo.png'
import RoutingPath from '../routes/RoutingPath'
import {useUserContext} from '../utils/global/provider/UserProvider'
import Profile from './Profile'
import Alive from '../components/users/Alive'



export const NavigationBar = () => {
    const {authenticatedUser} = useUserContext()

    const displayUserIfAuthenticated = () => {
        return (authenticatedUser)
            ? <LiRight><Profile/></LiRight>
            : <LiRight><Link to={RoutingPath.logInView}><ListItemIcon><ListItemText primary='Log in'/><LoginSharpIcon
                color='action' fontSize='medium'/></ListItemIcon></Link></LiRight>
    }

    return (
        <>
            <Nav>
                <Ul>
                    <LiLeft><Link to={RoutingPath.apiAliveView}><Img src={BookfaceLogo}
                                                                 alt='Bookface Logo'/></Link></LiLeft>
                    <Li><Input type='text' placeholder='Search Bookface'/></Li>
                    <Li><SearchIcon color='action' fontSize='large'/></Li>
                    <LiRight><Link to={RoutingPath.homeView}><ListItemIcon><ListItemText
                        primary='Home'/><HomeSharpIcon color='primary' fontSize='medium'
                                                       padding-top='inherit'/></ListItemIcon></Link></LiRight>
                    <LiRight><Link to={RoutingPath.friendsListView}><ListItemIcon><ListItemText primary='Friends List'/><PeopleAltSharpIcon
                        color='success'
                        fontSize='medium'
                        padding-top='inherit'/></ListItemIcon></Link></LiRight>
                    <LiRight><Link to={RoutingPath.privateMessageView}><ListItemIcon><ListItemText
                        primary='Messages'/><ForumSharpIcon color='primary'
                                                            fontSize='small'
                                                            padding-top='inherit'/></ListItemIcon></Link></LiRight>

                    {displayUserIfAuthenticated()}
                </Ul>
            </Nav>
            <Outlet/>
        </>
    )
}

export default NavigationBar

const Nav = styled.nav`;
  background-color: var(--primary-color);
  border: 2px solid var(--fifthly-color);
  overflow: hidden;
`

const Ul = styled.ul`
  list-style-type: none;
  margin: 0;
  padding: 0;
`

const LiLeft = styled.li`
  float: left;
  padding: 10px;
  text-transform: uppercase;
  font-weight: 400;
`
const Img = styled.img`
  width: 5em;
`

const Li = styled.li`
  float: left;
  padding: 2em 0 .5em 0;
`

const Input = styled.input`
  background-color: var(--fifthly-color);
  border: none;
  border-radius: 2em;
  padding: .8em;
  width: 100%;
`

const LiRight = styled.li`
  float: right;
  padding: 2.3em 1.5em 0 0;
  width: inherit;
  text-transform: uppercase;
  font-weight: 400;

  a {
    display: block;
    color: var(--fourthly-color);
    text-align: center;
    padding: 0 1em 1em 0;
    text-decoration: none;
  }
  
  a:hover {
    background-color: var(--fifthly-color);
    margin: 0;
    padding: 10px;
    border-radius: 10px;
  }
`

