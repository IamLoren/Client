import axios from 'axios';

export const api = axios.create({
    baseURL: 'https://server-osz5.onrender.com',
  });
  
  export const setToken = (token:string) => {
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
  };
  
  export const clearToken = () => {
    api.defaults.headers.common.Authorization = ``;
  };
  