// backend/src/routes/AuthRoutes.ts

import type { Express } from "express";

import { register, login, me } from "../controllers/AuthController";
import { requireAuth } from "../middlewares/AuthMiddleware";


const routes = (app: Express) => {
    app.post("/auth/register", register);
    app.post("/auth/login", login);
    app.get("/auth/me", requireAuth, me);
};

export default { routes };
