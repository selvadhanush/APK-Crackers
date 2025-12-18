import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
        "Content-Type": "application/json",
    },
});

// Add request interceptor to attach token to all requests
API.interceptors.request.use(
    (config) => {
        // Check sessionStorage first (for session-based auth), then localStorage
        const token = sessionStorage.getItem('token') || localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default API;