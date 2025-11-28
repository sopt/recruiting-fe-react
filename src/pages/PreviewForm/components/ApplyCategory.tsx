import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/utils/cn';

const CATEGORY = [
  {
    index: 0,
    text: '기본 인적사항',
    path: '#default',
  },
  {
    index: 1,
    text: '공통 질문',
    path: '#common',
  },
  {
    index: 2,
    text: '파트별 질문',
    path: '#partial',
  },
];

const ApplyCategory = () => {
  const location = useLocation();
  const currentCategory = location.hash || CATEGORY[0].path;

  return (
    <nav className="flex justify-center sticky top-[8rem] bg-white z-20 transition-all duration-500 ease-out">
      <ul className="flex">
        {CATEGORY.map((category) => {
          const isActive = currentCategory === category.path;
          return (
            <li key={category.text}>
              <Link
                to={category.path}
                className={cn(
                  'flex justify-center items-center w-[24rem] text-center heading_6_18_b',
                  'bg-white transition-colors duration-200 ease-out hover:text-gray-950',
                  isActive
                    ? cn(
                        'text-gray-950 border-b-4 border-gray-950 py-[2.45rem]'
                      )
                    : cn(
                        'text-gray-300 border-b-1 border-gray-300 py-[2.6rem] '
                      )
                )}
              >
                {category.text}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default ApplyCategory;
