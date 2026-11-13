import api from './api';
import { CustomWorkout, DayOfWeek, Workout, WorkoutPayload } from './types';

/** Plano semanal do aluno logado. Dias sem treino não vêm na lista (= descanso). */
export const getMyWorkouts = async (): Promise<Workout[]> => {
  const { data } = await api.get<Workout[]>('/workouts/me');
  return data;
};

/** Cria ou substitui o treino do aluno logado no dia informado. */
export const saveMyWorkout = async (day: DayOfWeek, payload: WorkoutPayload): Promise<Workout> => {
  const { data } = await api.put<Workout>(`/workouts/me/${day}`, payload);
  return data;
};

/** "Treine do seu jeito": descrição livre + foto opcional (multipart/form-data). */
export const createCustomWorkout = async (
  description: string,
  imageUri: string | null
): Promise<CustomWorkout> => {
  const form = new FormData();
  form.append('description', description);
  if (imageUri) {
    const fileName = imageUri.split('/').pop() ?? 'photo.jpg';
    const ext = fileName.split('.').pop()?.toLowerCase();
    // Formato de arquivo do React Native para FormData.
    form.append('image', {
      uri: imageUri,
      name: fileName,
      type: ext === 'png' ? 'image/png' : 'image/jpeg',
    } as unknown as Blob);
  }
  const { data } = await api.post<CustomWorkout>('/custom-workouts', form, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return data;
};
