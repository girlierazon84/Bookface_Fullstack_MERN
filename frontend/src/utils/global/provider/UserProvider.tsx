// frontend/src/utils/global/provider/UserProvider.tsx

import React, { createContext, useContext } from "react";


export type AuthenticatedContextValue = {
    authenticatedUser: string;
    setAuthenticatedUser: React.Dispatch<React.SetStateAction<string>>;
};

export const UserContext = createContext<AuthenticatedContextValue>({
    authenticatedUser: "",
    setAuthenticatedUser: () => undefined
});

export const useUserContext = () => useContext(UserContext);
