import api from "@/lib/axios"
import { deleteCookie, getCookie, setCookie } from "cookies-next"

export interface LoginCredentials {
  username: string
  password: string
}

interface LoginResponse {
  token: string
}

export const loginService = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const res = await api.post<{ data: LoginResponse }>("/login", credentials)
  return res.data.data
}

export const setAuthCookie = (token: string) => {
  setCookie("auth_token", token)
}

export const getAuthCookie = (token: string) => {
  getCookie("auth_token")
}

export const removeAuthCookie = () => {
  deleteCookie("auth_token")
}
