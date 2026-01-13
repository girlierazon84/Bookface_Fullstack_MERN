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
    createdAt?: string;
    updatedAt?: string;
};

const TOKEN_KEY = "auth_token" as const;
const USER_KEY = "auth_user" as const;

const safeParseUser = (raw: string | null): AuthUser | null => {
    if (!raw) return null;
    try {
        const parsed = JSON.parse(raw) as unknown;
        if (!parsed || typeof parsed !== "object") return null;

        const u = parsed as Partial<AuthUser>;

        // Minimum identity to treat as an AuthUser
        if (typeof u._id !== "string") return null;
        if (typeof u.username !== "string") return null;
        if (typeof u.firstname !== "string") return null;
        if (typeof u.lastname !== "string") return null;

        // Normalize optional strings (avoid null)
        const norm = (v: unknown) => (typeof v === "string" ? v : undefined);

        return {
            _id: u._id,
            username: u.username,
            firstname: u.firstname,
            lastname: u.lastname,
            email: norm(u.email),
            avatarUrl: norm(u.avatarUrl),
            coverUrl: norm(u.coverUrl),
            bio: norm(u.bio),
            createdAt: norm(u.createdAt),
            updatedAt: norm(u.updatedAt)
        };
    } catch {
        return null;
    }
};

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
        return safeParseUser(localStorage.getItem(USER_KEY));
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
