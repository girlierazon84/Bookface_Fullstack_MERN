// frontend/src/utils/api/http.ts

import axios from "axios";
import { authStorage } from "../auth/authStorage";


// Prefer a single base url in env for production/deploy:
// REACT_APP_API_BASE_URL=http://localhost:3001
const envBaseUrl = process.env.REACT_APP_API_BASE_URL;

const serverUrl = process.env.REACT_APP_SERVER_URL ?? "http://localhost";
const serverPort = process.env.REACT_APP_SERVER_PORT ?? "3001";

export const API_BASE_URL = (envBaseUrl ?? `${serverUrl}:${serverPort}`).replace(/\/+$/, "");

const http = axios.create({
    baseURL: API_BASE_URL
});

// Attach token for every request
http.interceptors.request.use((config) => {
    const token = authStorage.getToken();
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// If token invalid/expired => clear local auth
http.interceptors.response.use(
    (res) => res,
    (error) => {
        const status = error?.response?.status;
        if (status === 401) authStorage.clearAuth();
        return Promise.reject(error);
    }
);

export default http;
