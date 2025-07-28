import { api } from '@/apis/api';
import type { LoginForm, LoginResponse } from '@/pages/Login/types';

export const postLogin = async (data: LoginForm): Promise<LoginResponse> => {
  const response = await api
    .post<LoginResponse>('api/v2/recruiting-admin/signin', {
      json: { ...data },
    })
    .json();

  return response;
};
