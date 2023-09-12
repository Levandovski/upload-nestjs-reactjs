import axios, { AxiosInstance } from "axios";

const baseURL: string = import.meta.env.VITE_API;

const Api = () => {
  const api: AxiosInstance = axios.create({
    baseURL,
    headers: {
      "Content-Type": "application/json",
    },
  });

    return api;
};

export default Api;
