import cors from "cors";
import express from "express";
import helmet from "helmet";
import MorganMiddleware from "../middlewares/MorganMiddleware";


const allowedOrigins = ["http://localhost:3000"];
const allowedMethods = ["GET", "POST", "PUT", "DELETE"];

const options: cors.CorsOptions = {
    origin: allowedOrigins,
    methods: allowedMethods
};

const ApplyMiddlewares = (app: express.Application) => {
    app.use(helmet());
    app.use(cors(options));
    app.use(express.urlencoded({ extended: false }));
    app.use(express.json());
    app.use(MorganMiddleware);
};

export default ApplyMiddlewares;
