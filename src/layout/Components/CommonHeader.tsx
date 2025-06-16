import { ROUTES_CONFIG } from '@/routes/routeConfig';
import { useLocation } from 'react-router-dom';

const CommonHeader = () => {
  const path = useLocation();

  const pathName = path.pathname.slice(1) as keyof typeof ROUTES_CONFIG;

  return (
    <header>
      <h1>{ROUTES_CONFIG[pathName].title}</h1>
    </header>
  );
};

export default CommonHeader;
