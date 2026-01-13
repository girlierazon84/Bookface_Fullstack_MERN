// backend/src/interfaces/auth.ts

export interface RegisterInput {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
}

export interface LoginInput {
    username: string; // username or email (as used in controller)
    password: string;
}

export interface AuthUserDTO {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    avatarUrl: string;
    coverUrl: string;
    bio: string;
}

export interface AuthResponseDTO {
    token: string;
    user: AuthUserDTO;
}

export interface JwtPayloadDTO {
    id: string;
    username: string;
}
