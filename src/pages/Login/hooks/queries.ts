import type { LoginResponse } from '@/pages/Login/types';
import { ROUTES_CONFIG } from '@/routes/routeConfig';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../apis/postLogin';

export const usePostLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      postLogin(email, password),
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem('accessToken', data.data.token);
      localStorage.setItem('role', data.data.role);

      navigate(ROUTES_CONFIG.application.path);
    },
  });
};
