// backend/src/routes/aliveRoutes.ts

import { Router } from "express";
import statusCode from "../config/statusCode";


const router = Router();

router.get("/", (_req, res) => {
    res.status(statusCode.OK).send("My API is Alive!");
});

export default router;
