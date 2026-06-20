import { api } from "@api/axios/axios";
import { API_URL } from "@api/axios/config";
import { VerifyRequestDTO } from "./types/request";
import { LoginResponseDTO, VerifyResponseDTO } from "./types/response";

const AUTH_API = `${API_URL}/auth`;

export const login = async (phone: string) => {
  const res = await api.post<LoginResponseDTO>(`${AUTH_API}/login`, {
    phone,
  });
  return res;
};

export const verify = async ({ code, phone }: VerifyRequestDTO) => {
  const res = await api.post<VerifyResponseDTO>(`${AUTH_API}/verify`, {
    code,
    phone,
  });
  return res;
};

export const refresh = async (refreshToken: string) => {
  const res = api.post(`${AUTH_API}/refresh`, {
    refreshToken,
  });
  return res;
};

export const logout = async () => {
  const res = await api.post(`${AUTH_API}/logout`);
  return res;
};
