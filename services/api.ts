import axios, { AxiosError } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

const TOKEN_KEY = '@fittrack:token';

export const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://127.0.0.1:3000';

const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

export const getToken = () => AsyncStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => AsyncStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => AsyncStorage.removeItem(TOKEN_KEY);

api.interceptors.request.use(async (config) => {
  const token = await getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const isLoginRequest = error.config?.url?.includes('/auth/login');
    if (error.response?.status === 401 && !isLoginRequest) {
      await clearToken();
      router.replace('/');
    }
    return Promise.reject(error);
  }
);

/**
 * Extrai uma mensagem legível de um erro da API.
 * Formato do contrato (ADR-0003): { detail: string } ou { detail: [{ msg }] }.
 */
export const getErrorMessage = (error: unknown, fallback = 'Erro inesperado. Tente novamente.') => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return 'Não foi possível conectar ao servidor.';
    }
    const detail = (error.response.data as { detail?: unknown })?.detail;
    if (typeof detail === 'string') return detail;
    if (Array.isArray(detail) && detail[0]?.msg) return String(detail[0].msg);
  }
  return fallback;
};

export default api;
