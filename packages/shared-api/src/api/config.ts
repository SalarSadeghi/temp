export const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_DEVELOPMENT_API_URL || "http://localhost:3000/api"
  : `${window.location.protocol}//${window.location.host}/api`;
