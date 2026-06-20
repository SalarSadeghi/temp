export const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_API_URL
  : `${window.location.protocol}//${window.location.host}`;

export const API_URL = `${BASE_URL}/api/core/v1`;

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

export const AUTH_REFRESH_URL = "/auth/refresh";
export const AUTH_LOGOUT_URL = "/auth/logout";
