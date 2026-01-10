// frontend/src/routes/Routing.tsx

import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import RoutingPath from "./RoutingPath";
import UsersLogInView from "../view/UsersLogInView";
import SignUpFormView from "../view/SignUpFormView";
import HomeView from "../view/HomeView";
import CreatePostView from "../view/CreatePostView";
import ProfileView from "../view/ProfileView";
import SettingsView from "../view/SettingsView";
import { useUserContext } from "../provider/UserProvider";


const RequireAuth: React.FC<{ children: React.ReactElement }> = ({ children }) => {
    const { token } = useUserContext();
    return token ? children : <Navigate to={RoutingPath.usersLogInView} replace />;
};

export const Routing: React.FC = () => {
    const { token } = useUserContext();

    return (
        <Routes>
            {/* Public */}
            <Route
                path={RoutingPath.usersLogInView}
                element={token ? <Navigate to={RoutingPath.homeView} replace /> : <UsersLogInView />}
            />
            <Route
                path={RoutingPath.signUpFormView}
                element={token ? <Navigate to={RoutingPath.homeView} replace /> : <SignUpFormView />}
            />

            {/* Protected ("/" is your authenticated home/feed) */}
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

            {/* Fallback */}
            <Route
                path="*"
                element={<Navigate to={token ? RoutingPath.homeView : RoutingPath.usersLogInView} replace />}
            />
        </Routes>
    );
};
