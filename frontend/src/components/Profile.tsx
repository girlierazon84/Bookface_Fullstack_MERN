import React from 'react'
import './Profile.css'
import {Link, useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import RoutingPath from '../routes/RoutingPath'
import { useUserContext } from '../utils/global/provider/UserProvider'
import {ListItemIcon} from "@mui/material";
import ListItemText from "@mui/material/ListItemText";
import ForumSharpIcon from "@mui/icons-material/ForumSharp";

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
        <ProfileWrapper className='profileWrapper'>
            <Img src={ imgUrl }/>
            <SpanUserName>{ authenticatedUser }</SpanUserName>
            <div className='profileDropdown'>
                <Span onClick={ () => navigate(RoutingPath.settingsView) }>Settings</Span>
                <Span onClick={ () => navigate(RoutingPath.profileView) }>Profile</Span>
                <hr/>
                <Span onClick={ () => logout() }>Logout</Span>
            </div>
        </ProfileWrapper>
    )
}

export default Profile

const ProfileWrapper = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  height: 10px;
`

const Img = styled.img`
  align-self: center;
  border-radius: 50%;
  width: 4em;
  border: 1px solid gold;
`

const Span = styled.span`
  display: block;
  align-self: center;
  cursor: pointer;
  padding: 5px 10px;
`

const SpanUserName = styled.span`
  display: block;
  align-self: center;
  cursor: pointer;
  padding: 5px 10px;
  color: yellowgreen;
`