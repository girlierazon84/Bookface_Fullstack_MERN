// frontend/src/utils/auth/AuthBootstrap.tsx

import React, { useEffect, useState } from "react";
import AuthService from "../api/service/AuthService";
import { useUserContext } from "../global/provider/UserProvider";


type Props = {
    children: React.ReactNode;
};

const AuthBootstrap: React.FC<Props> = ({ children }) => {
    const { token, setAuth, logout } = useUserContext();
    const [checking, setChecking] = useState<boolean>(!!token);

    useEffect(() => {
        let alive = true;

        const run = async () => {
            if (!token) {
                if (alive) setChecking(false);
                return;
            }

            setChecking(true);

            try {
                const res = await AuthService.me();
                if (!alive) return;

                // Keep existing token, refresh user from server
                setAuth(token, res.data);
            } catch {
                if (!alive) return;
                logout();
            } finally {
                if (alive) setChecking(false);
            }
        };

        run();
        return () => {
            alive = false;
        };
    }, [token, setAuth, logout]);

    // Optional: render nothing while checking (prevents UI flicker)
    if (checking) return null;

    return <>{children}</>;
};

export default AuthBootstrap;
