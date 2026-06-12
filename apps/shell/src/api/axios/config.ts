export const API_BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_DEVELOPMENT_API_URL ||
    "http://10.96.192.118:3000/gateway"
  : `${window.location.protocol}//${window.location.host}/api`;

export const ACCESS_TOKEN_KEY = "access_token";
export const REFRESH_TOKEN_KEY = "refresh_token";

export const AUTH_REFRESH_URL = "/auth/refresh";
export const AUTH_LOGOUT_URL = "/auth/logout";
