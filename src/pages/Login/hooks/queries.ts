import { googleLogout } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { postGoogleLogin } from '@/pages/Login/apis/postGoogleLogin';
import { postLogin } from '@/pages/Login/apis/postLogin';
import { postLogout } from '@/pages/Login/apis/postLogout';
import { useLoginSuccess } from '@/pages/Login/hooks/useLoginSuccess';
import type { GoogleLoginRequest, LoginForm } from '@/pages/Login/types';
import { ROUTES_CONFIG } from '@/routes/routeConfig';

export const usePostLogin = () => {
  const handleLoginSuccess = useLoginSuccess();

  return useMutation({
    mutationFn: (data: LoginForm) => postLogin(data),
    onSuccess: handleLoginSuccess,
  });
};

export const usePostGoogleLogin = () => {
  const handleLoginSuccess = useLoginSuccess();

  return useMutation({
    mutationFn: (data: GoogleLoginRequest) => postGoogleLogin(data),
    onSuccess: handleLoginSuccess,
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
