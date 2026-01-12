// frontend/src/service/userService.ts

import http from "./http";


export type UserDTO = {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    avatarUrl?: string;
    coverUrl?: string;
    bio?: string;
    createdAt?: string;
    updatedAt?: string;
};

export type UpdateMePayload = Partial<Pick<UserDTO, "firstname" | "lastname" | "bio">>;

const UserService = {
    // Public
    getAllUsers: () => http.get<UserDTO[]>("/users"),
    getUserById: (id: string) => http.get<UserDTO>(`/users/${id}`),
    searchUsers: (username: string) => http.get<UserDTO[]>(`/users/search`, { params: { username } }),

    // Protected: me
    me: () => http.get<UserDTO>("/users/me"),
    updateMe: (payload: UpdateMePayload) => http.patch<UserDTO>("/users/me", payload),
    deleteMe: () => http.delete<{ message: string }>("/users/me"),

    // Protected: avatar / cover
    uploadMyAvatar: (file: File) => {
        const form = new FormData();
        form.append("avatar", file);
        return http.post<UserDTO>("/users/me/avatar", form);
    },
    deleteMyAvatar: () => http.delete<UserDTO>("/users/me/avatar"),

    uploadMyCover: (file: File) => {
        const form = new FormData();
        form.append("cover", file);
        return http.post<UserDTO>("/users/me/cover", form);
    },
    deleteMyCover: () => http.delete<UserDTO>("/users/me/cover")
};

export default UserService;
