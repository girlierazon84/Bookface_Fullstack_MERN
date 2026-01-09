// frontend/src/utils/api/service/UserService.ts

import http from "../http";


export type UserDTO = {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    avatarUrl?: string;
    bio?: string;
};

// Only for registration (AuthService uses this, but keeping the type is fine)
export type CreateUserPayload = {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
};

// Update should NOT include password.
// Keep it limited to fields your backend will realistically allow updating.
export type UpdateUserPayload = Partial<
    Pick<UserDTO, "firstname" | "lastname" | "avatarUrl" | "bio">
>;

const UserService = {
    // admin/dev endpoints (keep if AdminView uses them)
    getAllUsers: () => http.get<UserDTO[]>("/users"),
    getUserById: (id: string) => http.get<UserDTO>(`/users/${id}`),
    updateUser: (id: string, payload: UpdateUserPayload) =>
        http.put<UserDTO>(`/users/${id}`, payload),
    deleteUserById: (id: string) =>
        http.delete<{ message: string }>(`/users/${id}`)
};

export default UserService;
