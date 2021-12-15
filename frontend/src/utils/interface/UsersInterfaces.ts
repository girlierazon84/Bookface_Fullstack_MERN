export interface CreateUserObject {
    firstname: string
    lastname: string
    email: string
    username: string
    password: string
    gender: string
    birthdate: string
}

export interface UserDataObject {
    _id: string
    firstname: string
    lastname: string
    email: string
    username: string
    password: string
    gender: string
    birthdate: string
    createdAt: string
    updatedAt: string
}

export interface LogInDataObject {
    username: string
    password: string
}