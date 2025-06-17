import { Application, Cardinal, Edit } from '@/assets/svg';
import { useNavigate } from 'react-router-dom';

const MENU_LIST = [
  {
    title: '지원서 관리',
    path: '/',
    MenuIcon: Application,
  },
  {
    title: '기수 등록',
    path: '/',
    MenuIcon: Cardinal,
  },
  {
    title: '질문 등록', 
    path: '/',
    MenuIcon: Edit,
  },
];


const Nav = () => {
  const navigate = useNavigate();

  const handleSubMenuClick = (path: string) => {
    navigate(path);
  };

  return (
    <nav className='fixed top-0 left-0 flex w-[21.2rem] h-screen flex-col bg-gray900 p-[4.2rem_1.8rem]'>
      <header className='mb-[2.6rem]'>
        <h1 className='heading_5_20_b text-gray10'>SOPT ADMIN</h1>
        <p className="title_7_14_sb text-gray50">Recruit</p>
      </header>
      <ul className='flex flex-col gap-[0.6rem]'>
      {MENU_LIST.map((menu) => (
        <li key={menu.title}>
        <button
          type='button' 
          onClick={() => menu.path && handleSubMenuClick(menu.path[0])}
          className='flex items-center gap-8 rounded-[1rem] p-[1.2rem] cursor-pointer hover:bg-gray700 active:bg-white group transition-all duration-300'>
          <div className='flex items-center gap-8'>
            <menu.MenuIcon width={20} height={20} className="text-gray200 group-hover:text-white group-active:text-black transition-all duration-300"/>
            <h2 className='label_2_16_sb text-gray200 group-hover:text-white group-active:text-black transition-all duration-300'>{menu.title}</h2>
          </div>
        </button>
        </li>
      ))}

      </ul>
    </nav>
  );
};

export default Nav;
