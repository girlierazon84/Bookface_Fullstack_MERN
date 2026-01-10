// frontend/src/utils/api/service/AuthService.ts

import http from "../http";
import type { AuthUser } from "../../utils/auth/authStorage";


/**-----------------------------------------------
    Payload and response types for AuthService
--------------------------------------------------*/
// Registration payload type
export type RegisterPayload = {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
};

// Login payload type
export type LoginPayload = {
    username: string;
    password: string;
};

// Auth response type
export type AuthResponse = {
    token: string;
    user: AuthUser;
};

// AuthService with register, login, and me methods
const AuthService = {
    // User registration method
    register: (payload: RegisterPayload) =>
        http.post<AuthResponse>("/auth/register", payload),

    // User login method
    login: (payload: LoginPayload) =>
        http.post<AuthResponse>("/auth/login", payload),

    // Fetch current authenticated user method
    me: () => http.get<AuthUser>("/auth/me")
};

export default AuthService;
