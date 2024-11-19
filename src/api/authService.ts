import axios from "axios";

const API_URL = "https://ifms-todo.fly.dev/api/auth/token";

export const authService = {
  // Função para login e obtenção do token
  async login(
    username: string,
    password: string,
  ): Promise<string> {
    try {
      const response = await axios.post(API_URL, { username, password });
      const token = response.data.token;

      // Armazenar o token no localStorage
      if (token) {
        localStorage.setItem("authToken", token);
      }

      return token;
    } catch (error) {
      console.error("Erro ao autenticar:", error);
      throw error;
    }
  },
  // Função para obter o token armazenado
  getToken(): string | null {
    return localStorage.getItem("authToken");
  },
  // Função para remover o token (logout)
  logout(): void {
    localStorage.removeItem("authToken");
  },
};
