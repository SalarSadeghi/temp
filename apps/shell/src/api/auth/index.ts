import { api } from "@api/axios/axios";
import { API_URL } from "@api/axios/config";
import {
  ResetPasswordRequestDTO,
  UpdatePasswordRequestDTO,
  VerifyRequestDTO,
} from "./types/request";
import {
  LoginResponseDTO,
  VerifyResponseDTO,
} from "./types/response";

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

export const refresh = async () => {
  const res = api.post(`${AUTH_API}/refresh`);
  return res;
};

export const me = async () => {
  const res = await api.get(`${AUTH_API}/me`);
  return res;
};

export const logout = async () => {
  const res = await api.post(`${AUTH_API}/logout`);
  return res;
};

export const updatePassword = async ({
  currentPassword,
  newPassword,
}: UpdatePasswordRequestDTO) => {
  const res = await api.post(`${AUTH_API}/updatePassword`, {
    currentPassword,
    newPassword,
  });
  return res;
};

export const resetPassword = async ({
  code,
  password,
}: ResetPasswordRequestDTO) => {
  const res = await api.post(`${AUTH_API}/resetPassword`, {
    code,
    password,
  });
  return res;
};
