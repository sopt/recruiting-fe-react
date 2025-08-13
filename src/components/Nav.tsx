import { Link, useLocation } from 'react-router-dom';
import { Application, Cardinal, Edit } from '@/assets/svg';
import { ROUTES_CONFIG } from '@/routes/routeConfig';

const MENU_LIST = [
  {
    title: '지원서 관리',
    path: ROUTES_CONFIG.application,
    MenuIcon: Application,
  },
  {
    title: '기수 등록',
    path: ROUTES_CONFIG.postGeneration,
    MenuIcon: Cardinal,
  },
  {
    title: '질문 등록',
    path: ROUTES_CONFIG.postQuestion,
    MenuIcon: Edit,
  },
];

const Nav = () => {
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 flex w-[21.2rem] h-screen flex-col bg-gray900 p-[4.2rem_1.8rem] z-999">
      <header className="mb-[2.6rem]">
        <h1 className="heading_5_20_b text-gray10">SOPT ADMIN</h1>
        <p className="title_7_14_sb text-gray50">Recruit</p>
      </header>
      <ul className="flex flex-col gap-[0.6rem]">
        {MENU_LIST.map((menu) => {
          const path = menu.path.path;
          const isActive = location.pathname === path;

          return (
            <li key={menu.title} className="w-full">
              <Link
                to={path}
                className={`flex items-center w-full gap-8 rounded-[1rem] p-[1.2rem] cursor-pointer group transition-all duration-300
                ${isActive ? 'bg-white text-black' : 'hover:bg-gray700 active:bg-white'}`}
              >
                <menu.MenuIcon
                  width={20}
                  height={20}
                  className={`transition-all duration-300
                  ${isActive ? 'text-black' : 'text-gray200 group-hover:text-white group-active:text-black'}`}
                />
                <h2
                  className={`label_2_16_sb transition-all duration-300
                  ${isActive ? 'text-black' : 'text-gray200 group-hover:text-white group-active:text-black'}`}
                >
                  {menu.title}
                </h2>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
