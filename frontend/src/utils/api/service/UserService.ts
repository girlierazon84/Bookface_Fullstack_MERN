// frontend/src/utils/api/service/UserService.ts

import type {
    CreateUserObject,
    UpdateUserObject,
    UsersLogInDataObject,
    UserDataObject
} from "../../interface/UsersInterfaces";
import http from "../http";


const usersUrl = "/users";
const verifyUserUrl = "/verifyUser";

export type VerifyUserResponse = { message: boolean };

const UserService = {
    createUser: (payload: CreateUserObject) => http.post<UserDataObject>(usersUrl, payload),

    verifyUser: (payload: UsersLogInDataObject) =>
        http.post<VerifyUserResponse>(verifyUserUrl, payload),

    getAllUsers: () => http.get<UserDataObject[]>(usersUrl),

    getUserById: (id: string) => http.get<UserDataObject>(`${usersUrl}/${id}`),

    updateUser: (id: string, payload: UpdateUserObject) =>
        http.put<UserDataObject>(`${usersUrl}/${id}`, payload),

    deleteUserById: (id: string) => http.delete(`${usersUrl}/${id}`)
};

export default UserService;
