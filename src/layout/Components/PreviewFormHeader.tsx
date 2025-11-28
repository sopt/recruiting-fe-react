import { IconChevronLeft } from '@sopt-makers/icons';
import { useNavigate } from 'react-router-dom';
import { ROUTES_CONFIG } from '@/routes/routeConfig';

const PreviewFormHeader = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(ROUTES_CONFIG.postQuestion.path);
  };

  return (
    <header className="flex fixed top-0 items-center w-full h-[8rem] py-[2.1rem] px-[6.4rem] gap-[1.8rem]  bg-background z-[100]">
      <button
        type="button"
        className="flex align-middle justify-center p-[0.8rem] rounded-[100px] bg-gray700 cursor-pointer"
        onClick={handleGoBack}
      >
        <IconChevronLeft className="w-[2.4rem] h-[2.4rem]" />
      </button>
      <span className="title_4_20_sb">지원서 미리보기</span>
    </header>
  );
};

export default PreviewFormHeader;
