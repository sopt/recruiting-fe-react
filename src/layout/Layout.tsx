import Nav from "@/components/Nav";
import CommonHeader from "@/layout/Components/CommonHeader";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="ml-[12.4rem]">
      <Nav />
      <div className="pl-[21.2rem]">
        <CommonHeader />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
