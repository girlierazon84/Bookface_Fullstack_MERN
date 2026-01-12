// frontend/src/utils/auth/authStorage.ts

export type AuthUser = {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    email?: string;
    avatarUrl?: string;
    coverUrl?: string;
    bio?: string;
};

const TOKEN_KEY = "auth_token" as const;
const USER_KEY = "auth_user" as const;

export const authStorage = Object.freeze({
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
        this.setToken(token);
        this.setUser(user);
    },

    clearAuth() {
        this.clearToken();
        this.clearUser();
    },

    clear() {
        this.clearAuth();
    }
});
