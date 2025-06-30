import { api } from '@/apis/api';
import type { LoginResponse } from '@/pages/Login/types';

export const postLogin = async (
  email: string,
  password: string,
): Promise<LoginResponse> => {
  const response = await api
    .post<LoginResponse>('api/v2/recruiting-admin/signin', {
      json: { email, password },
    })
    .json();

  return response;
};
