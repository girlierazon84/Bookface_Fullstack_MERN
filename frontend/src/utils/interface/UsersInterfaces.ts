// frontend/src/utils/interface/usersInterfaces.ts

export type UserDataObject = {
    _id: string;
    firstname: string;
    lastname: string;
    email: string;
    username: string;
    avatarUrl?: string;
    bio?: string;
};

// auth payloads
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

// update payload (no password here)
export type UpdateUserObject = Partial<
    Pick<UserDataObject, "firstname" | "lastname" | "email" | "username" | "avatarUrl" | "bio">
>;
