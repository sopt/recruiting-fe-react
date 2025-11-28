import type { ButtonHTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES_CONFIG } from '@/routes/routeConfig';

interface PreviewButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const PreviewButton = ({ ...props }: PreviewButtonProps) => {
  const navigate = useNavigate();

  const 미리보기페이지로이동 = () => {
    navigate(ROUTES_CONFIG.previewForm.path);
  };

  return (
    <button
      type="button"
      onClick={미리보기페이지로이동}
      aria-label="뒤로 가기"
      className="label_4_12_sb h-[fit-content] text-gray30 whitespace-nowrap disabled:text-gray500 disabled:cursor-not-allowed cursor-pointer py-[0.4rem] border-b-[0.8px] border-b-transparent hover:border-gray30 disabled:hover:border-b-transparent"
      {...props}
    >
      미리보기
    </button>
  );
};

export default PreviewButton;
