import { useLocation } from 'react-router-dom';
import { useNav } from '@/contexts/NavContext';
import LogoutButton from '@/layout/Components/LogoutButton';
import { ROUTES_CONFIG } from '@/routes/routeConfig';

const CommonHeader = () => {
  const { pathname } = useLocation();

  const { isOpen } = useNav();

  const title = Object.values(ROUTES_CONFIG).find(
    (route) => route.path === pathname
  )?.title;

  return (
    <header className="realtive w-full h-[13.6rem] bg-background">
      <div className="fixed w-[100vw] h-[8rem] z-[100] bg-background">
        <div
          className={`absolute top-[2.8rem] left-[14.1rem] flex items-center justify-center gap-[0.8rem] transition-opacity duration-300 ease-out ${
            isOpen ? 'opacity-0' : 'opacity-100'
          }`}
        >
          <h1 className="heading_7_16_b text-gray10 whitespace-nowrap">
            SOPT ADMIN
          </h1>
          <p className="title_7_14_sb text-gray50">Recruit</p>
        </div>
        <LogoutButton />
      </div>
      <h1
        className={`absolute top-[8.8rem] title_1_32_sb text-gray10 transition-all duration-300 ease-out ${
          isOpen ? 'ml-[33.6rem]' : 'ml-[20rem]'
        }`}
      >
        {title}
      </h1>
    </header>
  );
};

export default CommonHeader;
