// backend/src/middlewares/morganMiddleware.ts

import morgan, { StreamOptions } from "morgan";
import logger from "../utils/logger";


const stream: StreamOptions = {
    write: (message) => logger.http(message.trim())
};

const skip = () => (process.env.NODE_ENV ?? "development") !== "development";

const morganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
);

export default morganMiddleware;
