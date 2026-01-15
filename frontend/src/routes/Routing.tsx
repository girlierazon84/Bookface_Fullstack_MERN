// frontend/src/routes/Routing.tsx

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import routingPath from "./routingPath";
import UsersLogInView from "../view/UsersLogInView";
import SignUpFormView from "../view/SignUpFormView";
import HomeView from "../view/HomeView";
import CreatePostView from "../view/CreatePostView";
import ProfileView from "../view/ProfileView";
import SettingsView from "../view/SettingsView";
import { useUserContext } from "../provider/UserProvider";


const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { token } = useUserContext();
    return token ? children : <Navigate to={routingPath.usersLogInView} replace />;
};

export const Routing: React.FC = () => {
    const { token } = useUserContext();

    return (
        <Routes>
            {/* Public */}
            <Route
                path={routingPath.usersLogInView}
                element={token ? <Navigate to={routingPath.homeView} replace /> : <UsersLogInView />}
            />
            <Route
                path={routingPath.signUpFormView}
                element={token ? <Navigate to={routingPath.homeView} replace /> : <SignUpFormView />}
            />

            {/* Protected ("/" is your authenticated home/feed) */}
            <Route
                path={routingPath.homeView}
                element={
                    <RequireAuth>
                        <HomeView />
                    </RequireAuth>
                }
            />
            <Route
                path={routingPath.profileView}
                element={
                    <RequireAuth>
                        <ProfileView />
                    </RequireAuth>
                }
            />
            <Route
                path={routingPath.createPostView}
                element={
                    <RequireAuth>
                        <CreatePostView />
                    </RequireAuth>
                }
            />
            <Route
                path={routingPath.settingsView}
                element={
                    <RequireAuth>
                        <SettingsView />
                    </RequireAuth>
                }
            />

            {/* Fallback */}
            <Route
                path="*"
                element={<Navigate to={token ? routingPath.homeView : routingPath.usersLogInView} replace />}
            />
        </Routes>
    );
};
