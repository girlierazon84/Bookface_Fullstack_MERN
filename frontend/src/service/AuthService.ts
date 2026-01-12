// frontend/src/service/authService.ts

import http from "./http";
import type { AuthUser } from "../utils/auth/authStorage";


export type RegisterPayload = {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
};

export type LoginPayload = {
    username: string; // username OR email (backend supports both)
    password: string;
};

export type AuthResponse = {
    token: string;
    user: AuthUser;
};

const authService = {
    register: (payload: RegisterPayload) => http.post<AuthResponse>("/auth/register", payload),
    login: (payload: LoginPayload) => http.post<AuthResponse>("/auth/login", payload),

    // backend returns user object
    me: () => http.get<AuthUser>("/auth/me")
};

export default authService;
