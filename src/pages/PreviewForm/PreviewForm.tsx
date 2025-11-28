import ApplyCategory from '@/pages/PreviewForm/components/ApplyCategory';
import ApplyHeader from '@/pages/PreviewForm/components/ApplyHeader';
import ApplyInfo from '@/pages/PreviewForm/components/ApplyInfo';
import DefaultSection from '@/pages/PreviewForm/components/DefaultSection';

const PreviewForm = () => {
  return (
    <div className="w-full p-8 gap-[5rem] flex flex-col bg-white min-h-screen items-center">
      <ApplyHeader />
      <ApplyInfo />
      <ApplyCategory />
      <DefaultSection />
    </div>
  );
};

export default PreviewForm;
