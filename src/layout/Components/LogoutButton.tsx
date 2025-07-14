import { ROUTES_CONFIG } from '@/routes/routeConfig';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate(ROUTES_CONFIG.login.path);
  };

  return (
    <button
      type="button"
      onClick={logout}
      className="fixed z-5 top-[2.1rem] right-[6.5rem] px-[2.4rem] py-[0.7rem] rounded-[19px] bg-gray800 text-gray200 text-[1.6rem] font-semibold leading-[2.4rem] tracking-[-0.24px] cursor-pointer"
    >
      로그아웃
    </button>
  );
};

export default LogoutButton;
