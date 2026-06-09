export const BASE_URL = import.meta.env.DEV
  ? import.meta.env.VITE_DEVELOPMENT_API_URL || "http://10.96.192.118:3000/gateway"
  : `${window.location.protocol}//${window.location.host}/api`;


