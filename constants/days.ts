import { DayOfWeek } from '@/services/types';

// Índice igual ao Date.getDay(): 0 = domingo.
export const DAYS: DayOfWeek[] = [
  'sunday',
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
];

export const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: 'Segunda-feira',
  tuesday: 'Terça-feira',
  wednesday: 'Quarta-feira',
  thursday: 'Quinta-feira',
  friday: 'Sexta-feira',
  saturday: 'Sábado',
  sunday: 'Domingo',
};

export const WEEK_ORDER: DayOfWeek[] = [...DAYS.slice(1), DAYS[0]];

export const getTodayKey = (): DayOfWeek => DAYS[new Date().getDay()];
