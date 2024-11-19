import axios from "axios";
import { authService } from "./authService";

// Criar uma instância do axios
const axiosInstance = axios.create();

// Adicionar um interceptor para anexar o token em cada requisição
axiosInstance.interceptors.request.use((config) => {
  const token = authService.getToken();
  if (token && config.headers) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default axiosInstance;
