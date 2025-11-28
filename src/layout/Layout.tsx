import { Outlet, useLocation } from 'react-router-dom';
import Nav from '@/components/Nav';
import CommonHeader from '@/layout/Components/CommonHeader';
import { ROUTES_CONFIG } from '@/routes/routeConfig';

const Layout = () => {
  const location = useLocation();
  const hasTable =
    location.pathname === ROUTES_CONFIG.postGeneration.path ||
    location.pathname === ROUTES_CONFIG.application.path;
  const isPreviewForm = location.pathname === ROUTES_CONFIG.previewForm.path;

  return (
    <>
      {!isPreviewForm && <Nav />}
      <CommonHeader />
      <div
        className={
          isPreviewForm ? 'ml-0' : hasTable ? 'ml-[12.4rem]' : 'ml-[33.6rem]'
        }
      >
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
