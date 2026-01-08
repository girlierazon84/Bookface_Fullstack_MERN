// frontend/src/App.tsx

import { useEffect, useMemo, useState } from "react";
import { UserContext } from "./utils/global/provider/UserProvider";
import { Routing } from "./routes/Routing";
import FooterContainer from "./components/FooterContainer";
import NavigationBar from "./components/nav/NavigationBar";
import { authStorage, type AuthUser } from "./utils/auth/authStorage";


function App() {
    const [token, setToken] = useState<string | null>(null);
    const [user, setUser] = useState<AuthUser | null>(null);

    useEffect(() => {
        setToken(authStorage.getToken());
        setUser(authStorage.getUser());
    }, []);

    const value = useMemo(() => {
        return {
            token,
            user,
            setAuth: (nextToken: string, nextUser: AuthUser) => {
                authStorage.setAuth(nextToken, nextUser);
                setToken(nextToken);
                setUser(nextUser);
            },
            logout: () => {
                authStorage.clearAuth();
                setToken(null);
                setUser(null);
            }
        };
    }, [token, user]);

    return (
        <UserContext.Provider value={value}>
            <Routing>
                <NavigationBar />
            </Routing>
            <FooterContainer />
        </UserContext.Provider>
    );
}

export default App;
