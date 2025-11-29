/** biome-ignore-all lint/a11y/useKeyWithClickEvents: 헤더 클릭시 네비게이션 토글 */
import { Link, useLocation } from 'react-router-dom';
import { Application, Cardinal, Edit, Toggle } from '@/assets/svg';
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

interface NavProps {
  isOpen: boolean;
  onToggle: () => void;
}

const Nav = ({ isOpen, onToggle }: NavProps) => {
  const location = useLocation();

  return (
    <nav
      className={`fixed top-0 left-0 flex h-screen flex-col bg-gray900 p-[4.2rem_1.8rem] z-999 overflow-hidden transition-all duration-300 ease-out ${
        isOpen ? 'w-[21.2rem]' : 'w-[7.6rem]'
      }`}
    >
      <header className="mb-[2.6rem] flex items-center gap-[1.2rem]">
        <Toggle
          width={24}
          height={24}
          className="p-[0.8rem] rounded-[1rem] box-content shrink-0 cursor-pointer hover:bg-gray700 active:bg-gray600 transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
        />

        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-label={isOpen ? '사이드바 접기' : '사이드바 열기'}
          className={`flex flex-col items-start cursor-pointer overflow-hidden transition-all duration-300 ${
            isOpen ? 'opacity-100 max-w-[12rem]' : 'opacity-0 max-w-0'
          }`}
        >
          <span className="heading_7_16_b text-gray10 whitespace-nowrap">
            SOPT ADMIN
          </span>
          <span className="title_7_14_sb text-gray50">Recruit</span>
        </button>
      </header>
      <ul className="flex flex-col gap-[0.6rem]">
        {MENU_LIST.map((menu) => {
          const path = menu.path.path;
          const isActive = location.pathname === path;

          return (
            <li key={menu.title} className="w-full">
              <Link
                to={path}
                className={`flex items-center h-[4.4rem]
                ${
                  isOpen
                    ? 'w-full gap-8 justify-start'
                    : 'w-[4.2rem] justify-center'
                }
                rounded-[1rem] p-[1.2rem] cursor-pointer group transition-all duration-300
                ${
                  isActive
                    ? 'bg-white text-black'
                    : 'hover:bg-gray700 active:bg-white'
                }`}
              >
                <menu.MenuIcon
                  width={20}
                  height={20}
                  className={`transition-all duration-300 shrink-0
                  ${
                    isActive
                      ? 'text-black'
                      : 'text-gray200 group-hover:text-white group-active:text-black'
                  }`}
                />
                {
                  <div
                    className={`overflow-hidden transition-[max-width] duration-500 ${
                      isOpen ? 'max-w-[14rem] delay-100' : 'max-w-0'
                    }`}
                  >
                    <h2
                      className={`label_2_16_sb whitespace-nowrap transition-opacity duration-200 ${
                        isOpen ? 'opacity-100' : 'opacity-0'
                      }
                    ${
                      isActive
                        ? 'text-black'
                        : 'text-gray200 group-hover:text-white group-active:text-black'
                    }`}
                    >
                      {menu.title}
                    </h2>
                  </div>
                }
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Nav;
