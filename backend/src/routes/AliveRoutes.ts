// backend/src/routes/aliveRoutes.ts

import type { Express, Request, Response } from "express";
import statusCode from "../config/statusCode";


const routes = (app: Express) => {
    app.get("/", (_req: Request, res: Response) => {
        res.status(statusCode.OK).send("My API is Alive!");
    });
};

export default { routes };
