import { Express } from 'express'
import StatusCode from '../configurations/StatusCode'


const routes = (app: Express) => {
    app.get('/', (req, res) => {
        res.status(StatusCode.OK).send('My API is Alive!')
    })
}

export default {
    routes
}