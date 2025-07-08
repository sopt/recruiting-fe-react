import QnaItem from '@/pages/ApplicationDetail/components/QnaItem';
import type { QuestionType } from '@/pages/ApplicationDetail/types';

interface QnaListProps {
  questions?: QuestionType[];
}

const QnaList = ({ questions }: QnaListProps) => {
  if (!questions) return <></>;

  return (
    <>
      <ul className="flex flex-col gap-[5.2rem]">
        {questions.map((questionData) => (
          <QnaItem key={questionData.id} {...questionData} />
        ))}
      </ul>
    </>
  );
};

export default QnaList;
