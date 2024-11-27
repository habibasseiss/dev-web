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

// Adicionar um interceptor para lidar com respostas
axiosInstance.interceptors.response.use((response) => {
  return response;
}, (error) => {
  if (error.response && (error.response.status === 401 || error.response.status === 500)) {
    authService.logout(); // remover o token do localStorage
  }
  return Promise.reject(error);
});

export default axiosInstance;
