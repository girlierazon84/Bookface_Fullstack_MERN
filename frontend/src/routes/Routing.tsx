import React from 'react'
import { BrowserRouter, Navigate, Routes } from "react-router-dom"
import RoutingPath from "./RoutingPath"
import { Route } from "react-router"
import LogInView from "../view/LogInView"
import FriendsListView from "../view/FriendsListView"
import HomeView from "../view/HomeView"
import PageNotFoundView from "../view/PageNotFoundView"
import FooterContainer from "../components/FooterContainer"
import PrivateMessageView from "../view/PrivateMessageView";
import SignUpFormView from "../view/SignUpFormView";
import Alive from '../components/users/Alive'
import ProfileView from "../view/ProfileView";



export const Routing = (props: { children?: React.ReactChild }) => {

    return (
        <BrowserRouter>
            { props.children }
            <Routes>
                <Route path={ RoutingPath.wildCardView } element={ <Navigate to={ RoutingPath.pageNotFoundView }/> }/>
                <Route path={ RoutingPath.logInView } element={ <LogInView/> }/>
                <Route path={ RoutingPath.signUpFormView } element={ <SignUpFormView/> }/>
                <Route path={ RoutingPath.profileView } element={ <ProfileView/> }/>
                <Route path={ RoutingPath.privateMessageView } element={ <PrivateMessageView/> }/>
                <Route path={ RoutingPath.friendsListView } element={ <FriendsListView/> }/>
                <Route path={ RoutingPath.homeView } element={ <HomeView/> }/>
                <Route path={ RoutingPath.apiAliveView} element={ <Alive/> }/>
                <Route path={ RoutingPath.pageNotFoundView } element={ <PageNotFoundView/> }/>
            </Routes>

            <FooterContainer/>
        </BrowserRouter>
    )
}