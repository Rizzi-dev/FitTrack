import api from './api';
import { Gym, UpdateMePayload, User } from './types';

export const getMe = async (): Promise<User> => {
  const { data } = await api.get<User>('/users/me');
  return data;
};

export const updateMe = async (payload: UpdateMePayload): Promise<User> => {
  const { data } = await api.patch<User>('/users/me', payload);
  return data;
};

export const getGyms = async (): Promise<Gym[]> => {
  const { data } = await api.get<Gym[]>('/gyms');
  return data;
};
