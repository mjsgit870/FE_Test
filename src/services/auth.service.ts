import { handleAxiosError } from "@/utils/error-handler";
import axios from "axios";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

export interface LoginCredentials {
  username: string;
  password: string;
}

interface LoginResponse {
  access_token: string;
  expires_in: number;
}

interface LogoutResponse {
  message: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const loginService = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  try {
    const res = await axios.post<LoginResponse>(`${apiUrl}/login`, credentials);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const logoutService = async (): Promise<LogoutResponse> => {
  try {
    const res = await axios.post<LogoutResponse>(`${apiUrl}/logout`);
    return res.data;
  } catch (error) {
    throw handleAxiosError(error);
  }
};

export const setAuthCookie = (token: string, expires_at: number) => {
  setCookie("auth_token", token, {
    maxAge: expires_at,
  });
};

export const getAuthCookie = () => {
  getCookie("auth_token");
};

export const removeAuthCookie = () => {
  deleteCookie("auth_token");
};
