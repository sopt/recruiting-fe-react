import { ROLE } from '@/constants';

export const getRole = () => {
  return localStorage.getItem(ROLE);
};

export const setRole = (role: string) => {
  localStorage.setItem(ROLE, role);
};

export const decimalToPercentage = (decimal: number | null): number => {
  if (decimal === null) return 1;

  return decimal / 100;
};
