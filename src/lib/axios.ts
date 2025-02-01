import { handleAxiosError } from "@/utils/error-handler";
import axios from "axios";
import { deleteCookie, getCookie } from "cookies-next";
import { redirect } from "next/navigation";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

const redirectToLogin = () => {
  if (typeof window !== "undefined") {
    window.location.href = "/login";
  } else {
    redirect("/login");
  }
};

api.interceptors.request.use(
  async (config) => {
    // Add any request interceptors here, such as adding authorization tokens
    const token = getCookie("auth_token");
    if (!token) {
      redirectToLogin();
    } else {
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
    if (error.response?.status === 401 && getCookie("auth_token")) {
      // Clear the invalid token
      deleteCookie("auth_token");
      // Redirect to login page
      redirectToLogin();
    }

    // Handle errors
    return Promise.reject(handleAxiosError(error));
  },
);

export default api;
