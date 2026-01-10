// frontend/src/utils/auth/AuthBootstrap.tsx

import React, { useEffect, useRef, useState } from "react";
import AuthService from "../../api/service/AuthService";
import { useUserContext } from "../../provider/UserProvider";


const AuthBootstrap: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const { token, user, setAuth, logout } = useUserContext();
    const [ready, setReady] = useState(false);

    // ensure we only bootstrap once per token (StrictMode-safe)
    const ranForTokenRef = useRef<string | null>(null);

    const userId = user?._id; // ✅ stable primitive for dependency

    useEffect(() => {
        // no token => app is "ready" (public routes)
        if (!token) {
            ranForTokenRef.current = null;
            setReady(true);
            return;
        }

        // already bootstrapped for this token
        if (ranForTokenRef.current === token) {
            setReady(true);
            return;
        }

        ranForTokenRef.current = token;
        let cancelled = false;

        (async () => {
            try {
                const res = await AuthService.me();
                if (cancelled) return;

                const me = res.data;

                // only update if missing or changed user
                if (!userId || userId !== me._id) {
                    setAuth(token, me);
                }

                setReady(true);
            } catch {
                if (cancelled) return;
                logout();
                setReady(true);
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [token, userId, setAuth, logout]);

    if (!ready) return null; // or a spinner component
    return <>{children}</>;
};

export default AuthBootstrap;
