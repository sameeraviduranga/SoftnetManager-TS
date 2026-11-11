import axios from "axios";
import { Navigate } from "react-router-dom";
import { tokenService } from "../services/tokenService";
import authApi from "../../features/auth/api/authApi";


const baseUrl = import.meta.env.VITE_API_BASE_URL;//"https://localhost:7200/api"
const clientId = "Client1";

const api = axios.create({
    baseURL: baseUrl,
    // headers: {
    //     //"Content-Type": "multipart/form-data"
    // }
});

//======================
//Request interceptor
//======================

api.interceptors.request.use(
    (config) => {
        const token = tokenService.getAccessToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


//======================
//Refresh Queue
//======================
const processQueue = (error, token = null) => {
    failedQueue.forEach((request) => {
        if (error) {
            request.reject(error);
        } else {
            request.resolve(token);
        }
    });

    failedQueue = [];
}
//======================
//response interceptor
//======================

let isRrefreshing = false;
let failedQueue = [];




api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (isRrefreshing) {
                return Promise((resolve, reject) => {
                    failedQueue.push({ resolve, reject });
                }).then((token) => {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    return api(originalRequest);
                });
            }

            isRrefreshing = true;

            try {

                const response = await authApi.post("/Auth/RefreshToken", {
                    RefreshToken: tokenService.getRefreshToken(),
                    ClientId: 'Client1'
                });

                const newAccessToken = response.data.Data.Token;
                const newRefreshToken = response.data.Data.RefreshToken;

                tokenService.setTokens(newAccessToken, newRefreshToken);

                processQueue(null, newAccessToken);

                originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                return api(originalRequest);



            } catch (refreshError) {
                processQueue(refreshError);
                tokenService.clearTokens();
                window.location.href = "/login";
                return Promise.reject(refreshError);
            } finally {
                isRrefreshing = false;
            }
        }

        return Promise.reject(error);
    }
);

export default api;