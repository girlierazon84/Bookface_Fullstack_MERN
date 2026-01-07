import type { Express, Request, Response } from "express";
import StatusCode from "../configurations/StatusCode";


const routes = (app: Express) => {
    app.get("/", (_req: Request, res: Response) => {
        res.status(StatusCode.OK).send("My API is Alive!");
    });
};

export default { routes };
