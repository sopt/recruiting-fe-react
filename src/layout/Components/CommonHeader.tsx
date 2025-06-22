import LogoutButton from "@/layout/Components/LogoutButton";
import { ROUTES_CONFIG } from "@/routes/routeConfig";
import { useLocation } from "react-router-dom";

const CommonHeader = () => {
  const path = useLocation();

  const pathName = path.pathname.slice(1) as keyof typeof ROUTES_CONFIG;

  return (
    <header className="realtive w-full h-[13.6rem]">
      <LogoutButton />
      <h1 className="absolute top-[8.8rem] title_1_32_sb text-gray10">
        {ROUTES_CONFIG[pathName]?.title}
      </h1>
    </header>
  );
};

export default CommonHeader;
