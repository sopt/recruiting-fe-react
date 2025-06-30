import type { LoginResponse } from '@/pages/Login/types';
import { useMutation } from '@tanstack/react-query';
import { postLogin } from '../apis/postLogin';

export const usePostLogin = () => {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      postLogin(email, password),
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem('accessToken', data.data.token);
      localStorage.setItem('role', data.data.role);
    },
  });
};
