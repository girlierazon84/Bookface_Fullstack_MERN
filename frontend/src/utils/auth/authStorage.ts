// frontend/src/auth/authStorage.ts

export type AuthUser = {
    _id: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    avatarUrl?: string;
    bio?: string;
};

const TOKEN_KEY = "bookface_token";
const USER_KEY = "bookface_user";

export const writeAuthStorage = (token: string, user: AuthUser) => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const readAuthStorage = (): { token: string; user: AuthUser } | null => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userRaw = localStorage.getItem(USER_KEY);

    if (!token || !userRaw) return null;

    try {
        const user = JSON.parse(userRaw) as AuthUser;
        if (!user?._id || !user?.username) return null;
        return { token, user };
    } catch {
        return null;
    }
};

export const clearAuthStorage = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
};
