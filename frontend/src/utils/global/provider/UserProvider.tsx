// frontend/src/utils/global/provider/UserProvider.tsx

import { createContext, useContext } from "react";
import type { AuthUser } from "../../auth/authStorage";


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
