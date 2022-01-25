import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import LogoutSharpIcon from '@mui/icons-material/LogoutSharp';
import {ListItemIcon} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import PostAddSharpIcon from '@mui/icons-material/PostAddSharp';
import RoutingPath from '../routes/RoutingPath'
import { useUserContext } from '../utils/global/provider/UserProvider'
import './Profile.css'

const Profile = () => {
    const navigate = useNavigate()
    const {authenticatedUser, setAuthenticatedUser} = useUserContext()
    const imgUrl = 'https://thispersondoesnotexist.com/image'

    const logout = () => {
        localStorage.removeItem('username')
        setAuthenticatedUser('')
        navigate(RoutingPath.homeView)
    }

    return (
        <>
            <LiRight>
                <Link to={RoutingPath.createPostView}>
                    <ListItemIcon>
                        <ListItemText primary='Add Post'/>
                        <PostAddSharpIcon color='primary'
                                          fontSize='medium'
                                          padding-top='inherit'/>
                    </ListItemIcon>
                </Link>
            </LiRight>

            <ProfileWrapper className='profileWrapper'>
                <Img src={ imgUrl }/>
                <SpanUserName>{ authenticatedUser }</SpanUserName>

                <div className='profileDropdown'>
                    <Span onClick={ () => navigate(RoutingPath.settingsView) }>Settings</Span>
                    <Span onClick={ () => navigate(RoutingPath.profileView) }>Profile</Span>
                    <hr/>
                    <Span onClick={ () => logout() }>
                        <LogoutSharpIcon color='action' fontSize='medium' />
                        Logout
                    </Span>
                </div>
            </ProfileWrapper>
        </>
    )
}

export default Profile

const ProfileWrapper = styled.section`
  display: flex;
  grid-template-columns: repeat(2, 1fr);
  height: 4.8vh;

  @media (max-width: 768px) {
    height: 40vh;
  }
`

const Img = styled.img`
  display: inline-block;
  cursor: pointer;
  align-self: center;
  border-radius: 50%;
  width: 4em;
  border: 1px solid var(--thirdly-color);
`
const SpanUserName = styled.span`
  display: block;
  align-self: center;
  cursor: pointer;
  padding-left: 10px;
  color: var(--secondary-color);
  font-family: "Oleo Script", sans-serif;
  font-weight: bold;
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
      margin-right: 215px;
      padding-top: 30px;
      width: 95px;
    }

    a:hover {
      width: 95px;
    }
  }
`

const Span = styled.span`
  display: block;
  align-self: center;
  cursor: pointer;
  padding: 10px 15px;
`

