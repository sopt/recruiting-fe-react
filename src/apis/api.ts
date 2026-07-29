import ky from 'ky';
import { afterResponse, beforeRetry } from '@/apis/interceptor';

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
  credentials: 'include',
});

export const tokenApi = api.extend({
  hooks: {
    beforeRetry: [beforeRetry],
    afterResponse: [afterResponse],
  },
});
