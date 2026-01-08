import React from "react";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import RoutingPath from "./RoutingPath";

import UsersLogInView from "../view/UsersLogInView";
import HomeView from "../view/HomeView";
import PageNotFoundView from "../view/PageNotFoundView";
import CreatePostView from "../view/CreatePostView";
import SignUpFormView from "../view/SignUpFormView";
import Alive from "../components/users/Alive";
import ProfileView from "../view/ProfileView";
import AdminView from "../view/AdminView";
import SettingsView from "../view/SettingsView";


type RoutingProps = {
    children?: React.ReactNode;
};

export const Routing: React.FC<RoutingProps> = ({ children }) => {
    return (
        <BrowserRouter>
            {children}
            <Routes>
                <Route
                    path={RoutingPath.wildCardView}
                    element={<Navigate to={RoutingPath.pageNotFoundView} />}
                />
                <Route path={RoutingPath.usersLogInView} element={<UsersLogInView />} />
                <Route path={RoutingPath.signUpFormView} element={<SignUpFormView />} />
                <Route path={RoutingPath.profileView} element={<ProfileView />} />
                <Route path={RoutingPath.createPostView} element={<CreatePostView />} />
                <Route path={RoutingPath.homeView} element={<HomeView />} />
                <Route path={RoutingPath.adminView} element={<AdminView />} />
                <Route path={RoutingPath.apiAliveView} element={<Alive />} />
                <Route path={RoutingPath.settingsView} element={<SettingsView />} />
                <Route path={RoutingPath.pageNotFoundView} element={<PageNotFoundView />} />
            </Routes>
        </BrowserRouter>
    );
};
