import { googleLogout } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postGoogleLogin } from '@/pages/Login/apis/postGoogleLogin';
import { postLogout } from '@/pages/Login/apis/postLogout';
import type { GoogleLoginRequest, LoginResponse } from '@/pages/Login/types';
import { ROUTES_CONFIG } from '@/routes/routeConfig';
import { setRole } from '@/utils';

export const usePostGoogleLogin = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: GoogleLoginRequest) => postGoogleLogin(data),
    onSuccess: (data: LoginResponse) => {
      setRole(data.data.role);

      navigate(ROUTES_CONFIG.application.path);
    },
  });
};

export const usePostLogout = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: postLogout,
    onSettled: () => {
      googleLogout();
      localStorage.clear();

      navigate(ROUTES_CONFIG.login.path);
    },
  });
};
