// frontend/src/utils/api/service/UserService.ts

import http from "../http";
import type { AuthUser } from "../../auth/authStorage";


export type RegisterPayload = {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
};

export type LoginPayload = {
    username: string;
    password: string;
};

export type AuthResponse = {
    token: string;
    user: AuthUser;
};

const UserService = {
    register: (payload: RegisterPayload) => http.post<AuthResponse>("/auth/register", payload),
    login: (payload: LoginPayload) => http.post<AuthResponse>("/auth/login", payload),
    me: () => http.get<AuthUser>("/auth/me")
};

export default UserService;
