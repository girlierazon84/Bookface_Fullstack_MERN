// backend/src/routes/authRoutes.ts

import type { Express } from "express";
import { register, login, me } from "../controllers/authController";
import { requireAuth } from "../middlewares/authMiddleware";


const routes = (app: Express) => {
    app.post("/auth/register", register);
    app.post("/auth/login", login);
    app.get("/auth/me", requireAuth, me);
};

export default { routes };
