import { Outlet, useLocation } from 'react-router-dom';
import Nav from '@/components/Nav';
import { useNav } from '@/contexts/NavContext';
import CommonHeader from '@/layout/Components/CommonHeader';
import { ROUTES_CONFIG } from '@/routes/routeConfig';

const Layout = () => {
  const location = useLocation();

  const { isOpen, toggle } = useNav();

  const hasTable =
    location.pathname === ROUTES_CONFIG.postGeneration.path ||
    location.pathname === ROUTES_CONFIG.application.path;

  return (
    <>
      <Nav isOpen={isOpen} onToggle={toggle} />
      <CommonHeader />
      <div
        className={`${
          isOpen
            ? hasTable
              ? 'ml-[12.4rem]'
              : 'ml-[33.6rem]'
            : hasTable
            ? 'ml-[7.6rem]'
            : 'ml-[20rem]'
        }`}
      >
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
