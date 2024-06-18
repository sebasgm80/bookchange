import axios from "axios";
import { updateToken } from "../utils";

// Crear una instancia de Axios para la API de usuario
export const APIuser = axios.create({
    baseURL: `https://proyecto-final-backend-7upm.onrender.com/api/v1`,
    //baseURL: `http://localhost:8080/api/v1`,
    timeout: 5000,
});

// Interceptor para actualizar el token antes de cada solicitud
APIuser.interceptors.request.use(
    (config) => {
        const token = updateToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
