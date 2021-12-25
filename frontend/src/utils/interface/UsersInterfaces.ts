export interface CreateUserObject {
    firstname: string
    lastname: string
    email: string
    username: string
    password: string
}

export interface UserDataObject {
    _id: string
    firstname: string
    lastname: string
    email: string
    username: string
    password: string
    createdAt: string
    updatedAt: string
}

export interface LogInDataObject {
    username: string
    password: string
}