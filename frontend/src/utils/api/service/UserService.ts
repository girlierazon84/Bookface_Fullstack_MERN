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

export type CreateUserPayload = {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
};

export type UpdateUserPayload = Partial<CreateUserPayload> & {
    avatarUrl?: string;
    bio?: string;
};

const UserService = {
    // admin/dev endpoints (keep if you still use AdminView)
    getAllUsers: () => http.get<UserDTO[]>("/users"),
    getUserById: (id: string) => http.get<UserDTO>(`/users/${id}`),
    updateUser: (id: string, payload: UpdateUserPayload) => http.put<UserDTO>(`/users/${id}`, payload),
    deleteUserById: (id: string) => http.delete<{ message: string }>(`/users/${id}`)
};

export default UserService;
