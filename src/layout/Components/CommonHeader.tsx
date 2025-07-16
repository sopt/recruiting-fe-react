import LogoutButton from '@/layout/Components/LogoutButton';
import { ROUTES_CONFIG } from '@/routes/routeConfig';
import { useLocation } from 'react-router-dom';

const CommonHeader = () => {
  const { pathname } = useLocation();

  const title = Object.values(ROUTES_CONFIG).find(
    (route) => route.path === pathname,
  )?.title;

  return (
    <header className="realtive w-full h-[13.6rem] pl-[21.2rem]">
      <div className="fixed w-full h-[8rem] z-[5] bg-background">
        <LogoutButton />
      </div>

      <h1 className="absolute top-[8.8rem] title_1_32_sb text-gray10">
        {title}
      </h1>
    </header>
  );
};

export default CommonHeader;
