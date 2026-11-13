import api from './api';
import { Notification, Student } from './types';

/** Aluno chama um instrutor da sua academia. */
export const callInstructor = async (): Promise<void> => {
  await api.post('/instructor-calls');
};

/** Alunos da academia do instrutor logado. */
export const getMyStudents = async (search?: string): Promise<Student[]> => {
  const { data } = await api.get<Student[]>('/instructors/me/students', {
    params: search ? { search } : undefined,
  });
  return data;
};

/** Notificações do usuário logado (mais recentes primeiro). */
export const getNotifications = async (): Promise<Notification[]> => {
  const { data } = await api.get<Notification[]>('/notifications');
  return data;
};
