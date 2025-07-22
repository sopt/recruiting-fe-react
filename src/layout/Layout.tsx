import Nav from '@/components/Nav';
import CommonHeader from '@/layout/Components/CommonHeader';
import { ROUTES_CONFIG } from '@/routes/routeConfig';
import { Outlet, useLocation } from 'react-router-dom';

const Layout = () => {
  const location = useLocation();
  const hasTable =
    location.pathname === ROUTES_CONFIG.postGeneration.path ||
    location.pathname === ROUTES_CONFIG.application.path;

  return (
    <>
      <Nav />
      <div className="ml-[33.6rem]">
        <CommonHeader />
      </div>
      <div className={hasTable ? 'ml-[12.4rem]' : 'ml-[33.6rem]'}>
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
