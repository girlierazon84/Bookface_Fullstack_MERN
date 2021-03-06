import bcrypt from 'bcrypt'
import StatusCode from '../configurations/StatusCode'
import UserModel from '../models/UserModel'
import { CreateNewUser } from '../utils/interfaces/Users'
import Logger from '../utils/Logger'
import {Request, Response} from 'express'

const saltRounds: number = 10

export const encryptPassword = async (password: string) => {
    let newPassword: string = ''
    await bcrypt.hash(password, saltRounds)
        .then(function (hash) {
            newPassword = hash
        })
    return newPassword
}

const createUser = async (req: Request, res: Response) => {
    Logger.http(req.body)
    let {
        firstname,
        lastname,
        email,
        username,
        password
    }: CreateNewUser = req.body

    // Bcrypt
    password = await encryptPassword(password)

    const user = new UserModel({
        firstname,
        lastname,
        email,
        username,
        password
    })
    Logger.debug(user)
    try {
        const response = await user.save()
        Logger.debug(response)
        res.status(StatusCode.CREATED).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR)
            .send({message: error.message})
    }
}

interface VerifyUser {
    message: boolean
}

const verifyUser = async (req: Request, res: Response) => {
    try {
        const {username, password} = req.body
        Logger.http(req.body)

        // Query
        const query: SearchForUser = {username: String(username)}
        const dbQuery = await UserModel.find(query)
        Logger.debug(dbQuery)

        // Verify password in bcrypt
        let response: VerifyUser
        await bcrypt.compare(String(password), dbQuery[0].password)
            .then(function (result) {
                Logger.debug('bcrypt')
                response = {
                    message: result
                }
            })

        res.status(StatusCode.OK).send(response)

    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR)
            .send({
                message: `Error occurred while trying to retrieve user with username: ${req.query.username}`,
                error: error.message
            })
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const response = await UserModel.find()
        Logger.debug(response)
        res.status(StatusCode.OK).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR)
            .send({message: error.message})
    }
}

const getUserWithId = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params
        Logger.http(`userId: ${userId}`)
        const response = await UserModel.findById(userId)
        Logger.debug(response)
        res.status(StatusCode.OK).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR)
            .send({
                message: `Error occurred while trying to retrieve user with ID: ${req.params.userId}`,
                error: error.message
            })
    }
}

interface SearchForUser {
    username: string
}

const getUserWithQuery = async (req: Request, res: Response) => {
    try {
        const {username} = req.query
        Logger.http(`username: ${username}`)
        const query: SearchForUser = {username: String(username)}
        const response = await UserModel.find(query)
        Logger.debug(response)
        response.length !== 0
            ? res.status(StatusCode.OK).send(response)
            : res.status(StatusCode.NOT_FOUND).send({
                message: `Couldn't find user with username: ${username}`
            })

    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR)
            .send({
                message: `Error occurred while trying to retrieve user with ID: ${req.params.userId}`,
                error: error.message
            })
    }
}

const updateUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params
        Logger.http(`userId: ${userId}`)
        let {
            firstname,
            lastname,
            email,
            username,
            password
        } = req.body
        Logger.http(`req.body: ${req.body}`)
        if (!req.body) {
            res.status(StatusCode.BAD_REQUEST)
                .send({message: `Cant update with empty body`})
        }

        // Bcrypt
        password = await encryptPassword(password)

        const response = await UserModel.findByIdAndUpdate(userId, {
            firstname,
            lastname,
            email,
            username,
            password
        }, {new: true})
        Logger.debug(response)
        res.status(StatusCode.OK).send(response)
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR)
            .send({
                message: `Error occurred while trying to update user with ID: ${req.params.userId}`,
                error: error.message
            })
    }
}

const deleteUser = async (req: Request, res: Response) => {
    try {
        const {userId} = req.params
        const response = await UserModel.findByIdAndDelete(userId)
        res.status(StatusCode.OK).send({
            message: `Successfully deleted user with username: ${response.username} and ID: ${userId}`
        })
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR)
            .send({
                message: `Error occurred while trying to delete user with ID: ${req.params.userId}`,
                error: error.message
            })
    }
}

export default {
    createUser,
    verifyUser,
    getAllUsers,
    getUserWithId,
    getUserWithQuery,
    updateUser,
    deleteUser
}