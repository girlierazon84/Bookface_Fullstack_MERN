import React from 'react'
import './Profile.css'
import {useNavigate} from 'react-router-dom'
import styled from 'styled-components'
import RoutingPath from '../routes/RoutingPath'
import { useUserContext } from '../utils/global/provider/UserProvider'

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
  display: flex;
  grid-template-columns: repeat(2, 1fr);
  height: 4.8vh;

  @media (max-width: 768px) {
    height: 18vh;
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

const Span = styled.span`
  display: block;
  align-self: center;
  cursor: pointer;
  padding: 10px 15px;
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