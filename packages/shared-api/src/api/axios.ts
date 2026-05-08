import { BASE_URL } from "./config.js";
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
