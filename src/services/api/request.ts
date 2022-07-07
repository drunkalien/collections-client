import axios, { AxiosError, AxiosRequestConfig } from "axios";

export const requestInstance = axios.create({
  baseURL: "http://localhost:5000/api/v1/",
});

requestInstance.interceptors.request.use((config: AxiosRequestConfig) => {
  const token = window.localStorage.getItem("token");

  config["headers"]!["Authorization"]! = `Bearer ${token}`;

  return config;
});

requestInstance.interceptors.response.use(
  (config: AxiosRequestConfig) => config,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      window.location.replace("/login");
    }
  }
);

export default requestInstance;
