import { handleAxiosError } from "@/utils/error-handler";
import axios from "axios";
import { getCookie } from "cookies-next";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    // Add any request interceptors here, such as adding authorization tokens
    const token = getCookie("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(handleAxiosError(error));
  },
);

api.interceptors.response.use(
  (response) => {
    // Add any response interceptors here
    return response;
  },
  (error) => {
    // Handle errors
    return Promise.reject(handleAxiosError(error));
  },
);

export default api;
