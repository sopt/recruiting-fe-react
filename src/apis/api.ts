import { afterResponse, beforeRetry } from '@/apis/interceptor';
import { getAccessToken } from '@/utils';
import ky from 'ky';

export const api = ky.create({
  prefixUrl: import.meta.env.VITE_BASE_URL,
});

export const tokenApi = api.extend({
  headers: {
    Authorization: `Bearer ${getAccessToken()}`,
  },
  hooks: {
    beforeRequest: [
      async (request) => {
        const token = getAccessToken();

        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    beforeRetry: [beforeRetry],
    afterResponse: [afterResponse],
  },
});
