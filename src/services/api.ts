import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { router } from "expo-router";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
  timeout: 120000,
  headers: { "Content-Type": "application/json" },
});

console.log("API URL:", process.env.EXPO_PUBLIC_API_URL);

// Injeta o token em toda requisição
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("access_token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Tenta refresh automaticamente se receber 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const original = error.config;

    if (error.response?.status === 401 && !original._retry) {
      original._retry = true;

      try {
        const refreshToken = await SecureStore.getItemAsync("refresh_token");
        const { data } = await api.post("/auth/refresh", { refresh_token: refreshToken });

        await SecureStore.setItemAsync("access_token", data.access_token);
        original.headers.Authorization = `Bearer ${data.access_token}`;

        return api(original);
      } catch {
        // se o refresh falhar, limpa tudo e manda pro login
        await SecureStore.deleteItemAsync("access_token");
        await SecureStore.deleteItemAsync("refresh_token");
        router.replace("/(public)/auth/login");
      }
    }

    return Promise.reject(error);
  }
);

// LOG pra entender pq o chat não ta respondendo
api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync("access_token");
  console.log("[LOG] Token:", token);
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});


export default api;