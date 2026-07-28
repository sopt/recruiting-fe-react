import { api } from '@/apis/api';
import type { GoogleLoginRequest, LoginResponse } from '@/pages/Login/types';

export const postGoogleLogin = async (
  data: GoogleLoginRequest,
): Promise<LoginResponse> => {
  const response = await api
    .post<LoginResponse>('recruiting-admin/signin/google', {
      json: { ...data },
    })
    .json();

  return response;
};
