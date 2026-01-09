// frontend/src/utils/global/provider/UserProvider.tsx

import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState
} from "react";
import {
    authStorage,
    type AuthUser
} from "../../auth/authStorage";


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

    // ✅ stable callbacks (won't change identity every render)
    const setAuth = useCallback((newToken: string, newUser: AuthUser) => {
        authStorage.setAuth(newToken, newUser);
        setToken(newToken);
        setUser(newUser);
    }, []);

    const logout = useCallback(() => {
        authStorage.clearAuth();
        setToken(null);
        setUser(null);
    }, []);

    const value = useMemo<AuthContextValue>(() => {
        return { token, user, setAuth, logout };
    }, [token, user, setAuth, logout]);

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
