import morgan, { StreamOptions } from "morgan";
import Logger from "../utils/Logger";


const stream: StreamOptions = {
    write: (message) => Logger.http(message.trim())
};

const skip = () => (process.env.NODE_ENV ?? "development") !== "development";

const MorganMiddleware = morgan(
    ":method :url :status :res[content-length] - :response-time ms",
    { stream, skip }
);

export default MorganMiddleware;
