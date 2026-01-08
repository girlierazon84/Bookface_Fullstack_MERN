// frontend/src/utils/interface/UsersInterfaces.ts

export interface CreateUserObject {
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    password: string;
}

export type UpdateUserObject = Partial<CreateUserObject>;

export interface UserDataObject extends CreateUserObject {
    _id: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface UsersLogInDataObject {
    username: string;
    password: string;
}
