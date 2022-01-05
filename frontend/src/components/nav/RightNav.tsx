import React from 'react';
import styled from 'styled-components';
import {useUserContext} from "../../utils/global/provider/UserProvider";
import Profile from "../Profile";
import {Link, Outlet} from "react-router-dom";
import RoutingPath from "../../routes/RoutingPath";
import {ListItemIcon} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import LoginSharpIcon from "@mui/icons-material/LoginSharp";
import HomeSharpIcon from "@mui/icons-material/HomeSharp";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

interface Props {
    open: boolean
}

const RightNav: React.FC<Props> = ({open}) => {
    const {authenticatedUser} = useUserContext()

    const displayUserIfAuthenticated = () => {
        return (authenticatedUser)
            ? <LiLeft><Profile/></LiLeft>
            : <LiLeft>
                <Link to={RoutingPath.usersLogInView}>
                    <ListItemIcon>
                        <ListItemText primary='Log in'/>
                        <LoginSharpIcon color='action'
                                        fontSize='medium'/>
                    </ListItemIcon>
                </Link>
            </LiLeft>
    }

    return (
        <>
            <Ul open={open}>
                <LiRight>
                    <Link to={RoutingPath.homeView}>
                        <ListItemIcon>
                            <ListItemText primary='Home'/>
                            <HomeSharpIcon color='primary'
                                           fontSize='medium'
                                           padding-top='inherit'/>
                        </ListItemIcon>
                    </Link>
                </LiRight>

                <LiRight>
                    <Link to={RoutingPath.adminView}>
                        <ListItemIcon>
                            <ListItemText primary='Admin'/>
                            <AdminPanelSettingsIcon color='primary'
                                                    fontSize='small'
                                                    padding-top='inherit'/>
                        </ListItemIcon>
                    </Link>
                </LiRight>

                {displayUserIfAuthenticated()}
            </Ul>
            <Outlet/>
        </>
    )
}

export default RightNav


const Ul = styled.ul<Props>`
  list-style: none;
  flex-flow: row nowrap;

  @media (max-width: 768px) {
    display: flex;
    flex-flow: column nowrap;
    background-color: var(--fifthly-color);
    position: fixed;
    transform: ${({open}) => open ? 'translateX(0)' : 'translateX(100%)'};
    margin-top: 0;
    top: 0;
    right: 0;
    height: 100vh;
    width: 50vh;
    padding-top: 3.5rem;
    transition: transform 0.3s ease-in-out;
  }
`

const LiLeft = styled.li`
  float: left;

  a {
    display: block;
    color: var(--fourthly-color);
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    border-bottom: 3px solid var(--secondary-color);
  }

  @media (max-width: 768px) {

    a {
      padding-top: 30px;
    }

    a:hover {
      width: 70px;
    }
  }
`

const LiRight = styled.li`
  float: right;

  a {
    display: block;
    color: var(--fourthly-color);
    margin-left: 30px;
    text-decoration: none;
    font-weight: bold;
  }

  a:hover {
    border-bottom: 3px solid var(--secondary-color);
  }

  @media (max-width: 768px) {
    a {
      margin-left: 0;
      padding-top: 30px;
    }

    a:hover {
      width: 68px;
    }
  }
`
