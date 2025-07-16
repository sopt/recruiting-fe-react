import Nav from '@/components/Nav';
import CommonHeader from '@/layout/Components/CommonHeader';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className="ml-[12.4rem]">
      <Nav />
      <CommonHeader />
      <Outlet />
    </div>
  );
};

export default Layout;
