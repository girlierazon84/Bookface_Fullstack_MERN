import dotenv from 'dotenv'
import express from 'express'
import { connect } from 'mongoose'
import Logger from '../utils/Logger'

// .env
dotenv.config()
const port: number = Number(process.env.SERVER_PORT)
const env: string = process.env.NODE_ENV
const mongodbUrl: string = process.env.MONGODB_URL
const dbName: string = process.env.MONGODB_DB_NAME

const connectToDatabase = async () => {
    const uri = mongodbUrl + dbName

    try {
        await connect(uri)
        Logger.info('You are successfully connected to the Database!')
    } catch (error) {
        Logger.error('Error occurred while trying to connect to the Database!'.toUpperCase(), error)
        process.exit()
    }
}

const connectToPort = (app: express.Application) => {
    app.listen(port, () => {
        Logger.info(`The server started att http://localhost:${ port }`)
        if (env === 'development') {
            Logger.warn(`The server running in development mode!`)
        }
    })
}

export default {
    connectToDatabase,
    connectToPort
}