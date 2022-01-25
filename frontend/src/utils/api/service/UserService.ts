import {
    CreateUserObject,
    UsersLogInDataObject,
    UserDataObject
} from '../../interface/UsersInterfaces'
import http from '../UsersApi'

const usersUrl = '/users'
const verifyUserUrl = '/verifyUser'

const UserService = {
    createUser: (newUserPayload: CreateUserObject) => {
        return http.post(usersUrl, newUserPayload)
    },

    verifyUser: (payload: UsersLogInDataObject) => {
        return http.post(verifyUserUrl, payload)
    },

    getAllUsers: () => {
        return http.get<UserDataObject[]>(usersUrl)
    },

    getUserById: (id: string) => {
        return http.get<UserDataObject>(`${ usersUrl }/${ id }`)
    },

    updateUser: (id: string, payload: CreateUserObject) => {
        return http.put(`${ usersUrl }/${ id }`, payload)
    },

    deleteUserById: (id: string) => {
        return http.delete(`${ usersUrl }/${ id }`)
    },

}

export default UserService