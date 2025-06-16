import CommonHeader from '@/layout/Components/CommonHeader';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <main className="ml-[12.4rem]">
      <CommonHeader />
      <Outlet />
    </main>
  );
};

export default Layout;
