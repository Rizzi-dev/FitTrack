import api, { clearToken, setToken } from './api';
import { LoginResponse, RegisterPayload, User } from './types';

export const login = async (email: string, password: string): Promise<User> => {
  const { data } = await api.post<LoginResponse>('/auth/login', { email, password });
  await setToken(data.access_token);
  return data.user;
};

export const register = async (payload: RegisterPayload): Promise<User> => {
  const { data } = await api.post<User>('/auth/register', payload);
  return data;
};

export const logout = async () => {
  await clearToken();
};
