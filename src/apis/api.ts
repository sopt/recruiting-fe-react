import { getAccessToken } from '@/utils';
import ky from 'ky';

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
});

export const tokenApi = api.extend({
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
});
