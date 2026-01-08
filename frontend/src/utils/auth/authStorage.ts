// frontend/src/utils/auth/authStorage.ts

export type AuthUser = {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    email?: string;
    avatarUrl?: string;
    bio?: string;
};

const TOKEN_KEY = "auth_token";
const USER_KEY = "auth_user";

export const authStorage = {
    getToken(): string | null {
        return localStorage.getItem(TOKEN_KEY);
    },

    setToken(token: string) {
        localStorage.setItem(TOKEN_KEY, token);
    },

    clearToken() {
        localStorage.removeItem(TOKEN_KEY);
    },

    getUser(): AuthUser | null {
        const raw = localStorage.getItem(USER_KEY);
        if (!raw) return null;
        try {
            return JSON.parse(raw) as AuthUser;
        } catch {
            return null;
        }
    },

    setUser(user: AuthUser) {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
    },

    clearUser() {
        localStorage.removeItem(USER_KEY);
    },

    setAuth(token: string, user: AuthUser) {
        authStorage.setToken(token);
        authStorage.setUser(user);
    },

    clearAuth() {
        authStorage.clearToken();
        authStorage.clearUser();
    },

    // ✅ alias for convenience (used in provider)
    clear() {
        authStorage.clearAuth();
    }
};
