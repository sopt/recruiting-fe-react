import { useNavigate } from 'react-router-dom';
import type { LoginResponse } from '@/pages/Login/types';
import { ROUTES_CONFIG } from '@/routes/routeConfig';
import { setRole } from '@/utils';

export const useLoginSuccess = () => {
  const navigate = useNavigate();

  return (data: LoginResponse) => {
    setRole(data.data.role);
    navigate(ROUTES_CONFIG.application.path);
  };
};
