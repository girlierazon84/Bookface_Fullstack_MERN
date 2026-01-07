import "dotenv/config";
import express from "express";

import ApplyMiddlewares from "./configurations/ApplyMiddlewares";
import Configuration from "./configurations/Configuration";
import { notFound, errorHandler } from "./middlewares/ErrorMiddleware";

import AliveRoutes from "./routes/AliveRoutes";
import UserRoutes from "./routes/UserRoutes";
import PostRoutes from "./routes/PostRoutes";


const app = express();

ApplyMiddlewares(app);

AliveRoutes.routes(app);
UserRoutes.routes(app);
PostRoutes.routes(app);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  await Configuration.connectToDatabase();
  Configuration.connectToPort(app);
};

start().catch((err) => {
  // last resort if startup fails
  // eslint-disable-next-line no-console
  console.error("Failed to start server", err);
  process.exit(1);
});

export default app;
