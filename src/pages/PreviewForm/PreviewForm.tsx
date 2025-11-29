import { useGetQuestionList } from '@/pages/PostQuestion/hooks/queries';
import ApplyCategory from '@/pages/PreviewForm/components/ApplyCategory';
import ApplyHeader from '@/pages/PreviewForm/components/ApplyHeader';
import ApplyInfo from '@/pages/PreviewForm/components/ApplyInfo';
import CommonSection from '@/pages/PreviewForm/components/CommonSection';
import DefaultSection from '@/pages/PreviewForm/components/DefaultSection';

const PreviewForm = () => {
  // TODO: season과 group을 전역 상태에서 받아오도록
  const { data: questionData } = useGetQuestionList(38, 'YB');

  const commonQuestions = questionData?.commonQuestions.map(
    (question, index) => ({
      id: question.id || index + 1,
      question: question.content,
      charLimit: question.charLimit || 0,
      placeholder: question.placeholder || '내용을 입력해주세요',
      urls: question.link ? [question.link] : undefined,
      isFile: question.isFile,
      optional: !question.required,
      isDescription: question.isDescription,
    })
  );

  return (
    <div className="w-full p-8 flex flex-col bg-white min-h-screen items-center">
      <ApplyHeader />
      <div className="flex flex-col gap-[5rem]">
        <ApplyInfo />
        <ApplyCategory />
        <DefaultSection />
        <CommonSection questions={commonQuestions} />
      </div>
    </div>
  );
};

export default PreviewForm;
