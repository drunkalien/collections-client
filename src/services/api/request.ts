import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const requestInstance = axios.create({
  baseURL: "https://collections-server-production.up.railway.app/",
});

requestInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = window.localStorage.getItem("token");

  if (token) {
    config["headers"]!["Authorization"]! = `Bearer ${token}`;
  }

  return config;
});

requestInstance.interceptors.response.use(
  (config: AxiosRequestConfig) => config,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      alert("You are not logged in!");
    }
  }
);

export default requestInstance;
