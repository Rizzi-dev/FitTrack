export type UserType = 'student' | 'instructor';
export type Sex = 'male' | 'female';

export type DayOfWeek =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface Gym {
  id: number;
  name: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  sex: Sex;
  user_type: UserType;
  gym: Gym | null;
  specialty: string | null;
}

export interface LoginResponse {
  access_token: string;
  token_type: 'bearer';
  user: User;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
  sex: Sex;
  user_type: UserType;
}

export interface UpdateMePayload {
  name?: string;
  specialty?: string | null;
  gym_id?: number;
}

export interface Exercise {
  machine: string;
  sets: string; // ex: "4x10"
}

export interface Workout {
  id: number;
  day_of_week: DayOfWeek;
  name: string;
  exercises: Exercise[];
}

export interface WorkoutPayload {
  name: string;
  exercises: Exercise[];
}

export interface CustomWorkout {
  id: number;
  description: string;
  image_url: string | null;
  created_at: string;
}

export interface Student {
  id: number;
  name: string;
  email: string;
  last_workout_at: string | null;
}

export interface Notification {
  id: number;
  message: string;
  created_at: string;
  read: boolean;
}
