import express from 'express'
import StatusCode from '../configurations/StatusCode'

const url = '/'
const routes = (app: express.Application) => {
    app.get(url, (req, res) => {
        res.status(StatusCode.OK).send('My API is Alive!...')
    })
}

export default {
    routes
}