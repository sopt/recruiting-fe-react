import type { AfterResponseHook, BeforeRetryHook } from 'ky';
import ky, { HTTPError } from 'ky';
import { ROUTES_CONFIG } from '@/routes/routeConfig';

export const beforeRetry: BeforeRetryHook = async ({ error }) => {
  if (error instanceof HTTPError && error.response?.status === 401) {
    window.location.href = ROUTES_CONFIG.login.path;
    return ky.stop;
  }
};

export const afterResponse: AfterResponseHook = async (
  _request,
  _options,
  response,
) => {
  if (response.status === 401) {
    window.location.href = ROUTES_CONFIG.login.path;
  }
  return response;
};
