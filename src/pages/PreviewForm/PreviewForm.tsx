import ApplyCategory from '@/pages/PreviewForm/components/ApplyCategory';
import ApplyHeader from '@/pages/PreviewForm/components/ApplyHeader';
import ApplyInfo from '@/pages/PreviewForm/components/ApplyInfo';

const PreviewForm = () => {
  return (
    <div className="w-full p-8 gap-[5rem] flex flex-col bg-white min-h-screen">
      <ApplyHeader />
      <ApplyInfo />
      <ApplyCategory />
    </div>
  );
};

export default PreviewForm;
