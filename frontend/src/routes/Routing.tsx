// frontend/src/routes/Routing.tsx

import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
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
import { useUserContext } from "../utils/global/provider/UserProvider";


type RoutingProps = { children?: React.ReactNode };

const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { token } = useUserContext();
    if (!token) return <Navigate to={RoutingPath.usersLogInView} replace />;
    return children;
};

export const Routing: React.FC<RoutingProps> = ({ children }) => {
    return (
        <BrowserRouter>
            {children}
            <Routes>
                {/* Public */}
                <Route path={RoutingPath.usersLogInView} element={<UsersLogInView />} />
                <Route path={RoutingPath.signUpFormView} element={<SignUpFormView />} />

                {/* Protected */}
                <Route
                    path={RoutingPath.homeView}
                    element={
                        <RequireAuth>
                            <HomeView />
                        </RequireAuth>
                    }
                />
                <Route
                    path={RoutingPath.profileView}
                    element={
                        <RequireAuth>
                            <ProfileView />
                        </RequireAuth>
                    }
                />
                <Route
                    path={RoutingPath.createPostView}
                    element={
                        <RequireAuth>
                            <CreatePostView />
                        </RequireAuth>
                    }
                />
                <Route
                    path={RoutingPath.settingsView}
                    element={
                        <RequireAuth>
                            <SettingsView />
                        </RequireAuth>
                    }
                />

                {/* Admin/misc (protect if you want) */}
                <Route path={RoutingPath.adminView} element={<AdminView />} />
                <Route path={RoutingPath.apiAliveView} element={<Alive />} />

                {/* 404 */}
                <Route path={RoutingPath.pageNotFoundView} element={<PageNotFoundView />} />
                <Route path={RoutingPath.wildCardView} element={<Navigate to={RoutingPath.pageNotFoundView} replace />} />
            </Routes>
        </BrowserRouter>
    );
};
