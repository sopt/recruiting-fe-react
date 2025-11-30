import ApplyCategory from '@/pages/PreviewForm/components/ApplyCategory';
import ApplyHeader from '@/pages/PreviewForm/components/ApplyHeader';
import ApplyInfo from '@/pages/PreviewForm/components/ApplyInfo';
import BottomSection from '@/pages/PreviewForm/components/BottomSection';
import DefaultSection from '@/pages/PreviewForm/components/DefaultSection';

const PreviewForm = () => {
  return (
    <div className="w-full p-8 flex flex-col bg-white min-h-screen items-center">
      <ApplyHeader />
      <div className="flex flex-col gap-[5rem]">
        <ApplyInfo />
        <ApplyCategory />
        <DefaultSection />
        <BottomSection />
      </div>
    </div>
  );
};

export default PreviewForm;
