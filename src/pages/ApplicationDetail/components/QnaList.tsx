import QnaItem from '@/pages/ApplicationDetail/components/QnaItem';
import type { QuestionType } from '@/pages/ApplicationDetail/types';

interface QnaListProps {
  questions?: QuestionType[];
}

const QnaList = ({ questions }: QnaListProps) => {
  if (!questions) return <></>;

  const orderOffset = questions[0]?.isDescription ? 0 : 1;

  return (
    <>
      <ul className="flex flex-col gap-[5.2rem]">
        {questions.map((questionData, index) => {
          return questionData.isDescription && index === 0 ? (
            <li
              key={questionData.id}
              className="title_5_18_sb whitespace-pre-line"
            >
              {questionData.content}
            </li>
          ) : (
            <QnaItem
              key={questionData.id}
              orderOffset={orderOffset}
              {...questionData}
            />
          );
        })}
      </ul>
    </>
  );
};

export default QnaList;
