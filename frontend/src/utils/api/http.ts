// frontend/src/utils/api/http.ts

import axios from "axios";


const serverUrl = process.env.REACT_APP_SERVER_URL ?? "http://localhost";
const serverPort = process.env.REACT_APP_SERVER_PORT ?? "3001";

export const API_BASE_URL = `${serverUrl}:${serverPort}`;

const http = axios.create({
    baseURL: API_BASE_URL
});

export default http;
