// frontend/src/utils/global/provider/UserProvider.tsx

import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { AuthUser } from "../../../utils/auth/authStorage";
import { clearAuthStorage, readAuthStorage, writeAuthStorage } from "../../../utils/auth/authStorage";


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

type Props = { children: React.ReactNode };

export const UserProvider: React.FC<Props> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<AuthUser | null>(null);

    // Load persisted auth once
    useEffect(() => {
        const saved = readAuthStorage();
        if (saved?.token && saved?.user) {
            setToken(saved.token);
            setUser(saved.user);
        }
    }, []);

    const setAuth = useCallback((newToken: string, newUser: AuthUser) => {
        setToken(newToken);
        setUser(newUser);
        writeAuthStorage(newToken, newUser);
    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        clearAuthStorage();
    }, []);

    const value = useMemo<AuthContextValue>(
        () => ({ token, user, setAuth, logout }),
        [token, user, setAuth, logout]
    );

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
