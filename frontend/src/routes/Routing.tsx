// frontend/src/routes/Routing.tsx

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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


// Component to protect routes that require authentication
const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    // Check if the user is authenticated (using context or any state management)
    const { token } = useUserContext();
    if (!token) return <Navigate to={RoutingPath.usersLogInView} replace />;
    return children;
};

// Main routing component export
export const Routing: React.FC = () => {
    return (
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

            {/* Admin/misc */}
            <Route path={RoutingPath.adminView} element={<AdminView />} />
            <Route path={RoutingPath.apiAliveView} element={<Alive />} />

            {/* 404 */}
            <Route path={RoutingPath.pageNotFoundView} element={<PageNotFoundView />} />
            <Route path={RoutingPath.wildCardView} element={<Navigate to={RoutingPath.pageNotFoundView} replace />} />
        </Routes>
    );
};
