// frontend/src/utils/api/http.ts

import axios from "axios";
import { authStorage } from "../auth/authStorage";


const serverUrl = process.env.REACT_APP_SERVER_URL ?? "http://localhost";
const serverPort = process.env.REACT_APP_SERVER_PORT ?? "3001";

export const API_BASE_URL = `${serverUrl}:${serverPort}`;

const http = axios.create({
    baseURL: API_BASE_URL
});

// Attach token for every request (FB-like session)
http.interceptors.request.use((config) => {
    const token = authStorage.getToken();
    if (token) {
        config.headers = config.headers ?? {};
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// If token is invalid/expired => clear local auth
http.interceptors.response.use(
    (res) => res,
    (error) => {
        const status = error?.response?.status;
        if (status === 401) {
            authStorage.clearAuth();
        }
        return Promise.reject(error);
    }
);

export default http;
