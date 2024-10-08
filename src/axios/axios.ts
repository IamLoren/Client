import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

export const api = axios.create({
  baseURL: URL,
});

export const setToken = (token: string) => {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const clearToken = () => {
  api.defaults.headers.common.Authorization = ``;
};
