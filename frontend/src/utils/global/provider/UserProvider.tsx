// frontend/src/utils/global/provider/UserProvider.tsx

import React, { createContext, useContext, useMemo, useState } from "react";
import { authStorage, type AuthUser } from "../../auth/authStorage";


export type AuthContextValue = {
    user: AuthUser | null;
    token: string | null;
    setAuth: (token: string, user: AuthUser) => void;
    logout: () => void;
};

export const UserContext = createContext<AuthContextValue>({
    user: null,
    token: null,
    setAuth: () => undefined,
    logout: () => undefined
});

export const useUserContext = () => useContext(UserContext);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [token, setToken] = useState<string | null>(() => authStorage.getToken());
    const [user, setUser] = useState<AuthUser | null>(() => authStorage.getUser());

    const value = useMemo<AuthContextValue>(() => {
        return {
            token,
            user,
            setAuth: (newToken, newUser) => {
                authStorage.setAuth(newToken, newUser);
                setToken(newToken);
                setUser(newUser);
            },
            logout: () => {
                authStorage.clear(); // ✅ now valid
                setToken(null);
                setUser(null);
            }
        };
    }, [token, user]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
