import { useLocation } from 'react-router-dom';
import LogoutButton from '@/layout/Components/LogoutButton';
import PreviewFormHeader from '@/layout/Components/PreviewFormHeader';
import { ROUTES_CONFIG } from '@/routes/routeConfig';

const CommonHeader = () => {
  const { pathname } = useLocation();

  const isPreviewForm = pathname === ROUTES_CONFIG.previewForm.path;

  const title = Object.values(ROUTES_CONFIG).find(
    (route) => route.path === pathname
  )?.title;

  if (isPreviewForm) {
    return <PreviewFormHeader />;
  }

  return (
    <header className="realtive w-full h-[13.6rem] bg-background">
      <div className="fixed w-[100vw] h-[8rem] z-[100] bg-background">
        <LogoutButton />
      </div>
      <h1 className="absolute top-[8.8rem] title_1_32_sb text-gray10 ml-[33.6rem]">
        {title}
      </h1>
    </header>
  );
};

export default CommonHeader;
