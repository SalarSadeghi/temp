import { api } from "@api/axios/axios";
import { API_URL } from "@api/axios/config";

const USER_API = `${API_URL}/user`;

export const getCurrent = async () => {
  const res = await api.get(`${USER_API}/current`);
  return res;
};
