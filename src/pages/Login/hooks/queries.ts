import { postLogin } from '@/pages/Login/apis/postLogin';
import type { LoginForm, LoginResponse } from '@/pages/Login/types';
import { ROUTES_CONFIG } from '@/routes/routeConfig';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const usePostLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginForm) => postLogin(data),
    onSuccess: (data: LoginResponse) => {
      localStorage.setItem('accessToken', data.data.token);
      localStorage.setItem('role', data.data.role);

      navigate(ROUTES_CONFIG.application.path);
    },
  });
};
