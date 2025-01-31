import api from "@/lib/axios";
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

export const loginService = async (credentials: LoginCredentials): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>("/login", credentials);
  return res.data;
};

export const logoutService = async (): Promise<LogoutResponse> => {
  await new Promise((r) => setTimeout(r, 2000));
  const res = await api.post<LogoutResponse>("/logout");
  return res.data;
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
