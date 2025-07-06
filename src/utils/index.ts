import { ACCESS_TOKEN, ROLE } from '@/constants';

export const getAccessToken = () => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const setAccessToken = (token: string) => {
  localStorage.setItem(ACCESS_TOKEN, token);
};

export const getRole = () => {
  return localStorage.getItem(ROLE);
};

export const setRole = (role: string) => {
  localStorage.setItem(ROLE, role);
};
