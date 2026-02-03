import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '@/pages/Login/apis/postLogin';
import type { LoginForm, LoginResponse } from '@/pages/Login/types';
import { ROUTES_CONFIG } from '@/routes/routeConfig';
import { setAccessToken, setRole } from '@/utils';

export const usePostLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: LoginForm) => postLogin(data),
    onSuccess: (data: LoginResponse) => {
      setAccessToken(data.data.token);
      setRole(data.data.role);

      navigate(ROUTES_CONFIG.application.path);
    },
  });
};
