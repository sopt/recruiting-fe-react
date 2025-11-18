import { useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Nav from '@/components/Nav';
import CommonHeader from '@/layout/Components/CommonHeader';
import { ROUTES_CONFIG } from '@/routes/routeConfig';

const Layout = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const location = useLocation();
  const hasTable =
    location.pathname === ROUTES_CONFIG.postGeneration.path ||
    location.pathname === ROUTES_CONFIG.application.path;

  return (
    <>
      <Nav isOpen={isNavOpen} onToggle={() => setIsNavOpen((prev) => !prev)} />
      <CommonHeader isOpen={isNavOpen} />
      <div
        className={
          hasTable ? 'ml-[12.4rem]' : isNavOpen ? 'ml-[33.6rem]' : 'ml-[20rem]'
        }
      >
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
