import CommonHeader from '@/layout/Components/CommonHeader';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <CommonHeader />
      <Outlet />
    </>
  );
};

export default Layout;
