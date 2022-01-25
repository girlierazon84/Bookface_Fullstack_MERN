import express from 'express'
import ApplyMiddlewares from './configurations/ApplyMiddlewares'
import Configuration from './configurations/Configuration'
import { notFound } from './middlewares/Middleware'
import AliveRoutes from './routes/AliveRoutes'
import UserRoutes from './routes/UserRoutes'
import PostRoutes from "./routes/PostRoutes";

const app = express()

ApplyMiddlewares(app)

AliveRoutes.routes(app)
UserRoutes.routes(app)
PostRoutes.routes(app)


app.use(notFound)

Configuration.connectToPort(app)
Configuration.connectToDatabase().then()

export default app