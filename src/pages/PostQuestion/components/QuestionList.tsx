import { Add } from '@/assets/svg';
import DescriptionBox from '@/pages/PostQuestion/components/DescriptionBox';
import QuestionBox from '@/pages/PostQuestion/components/QuestionBox';
import {
  DEFAULT_DESCRIPTION_DATA,
  DEFAULT_QUESTION_DATA,
} from '@/pages/PostQuestion/constant';

import { Button } from '@sopt-makers/ui';
import { useGetQuestionList } from '@/pages/PostQuestion/hooks/quries';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { useEffect } from 'react';
import type { Group, PartName } from '@/pages/PostQuestion/types';

interface QuestionListProps {
  hasDescription: boolean;
  handleHasDescriptionChange: (bool: boolean) => void;
  selectedSeason: number;
  selectedGroup: Group;
  selectedPart: PartName;
}

const QuestionList = ({
  hasDescription,
  handleHasDescriptionChange,
  selectedSeason,
  selectedGroup,
  selectedPart,
}: QuestionListProps) => {
  const { data: questionListData, isSuccess } = useGetQuestionList(
    selectedSeason,
    selectedGroup,
  );

  const { control, reset, watch } = useFormContext();

  useEffect(() => {
    const partQuestion = questionListData?.partQuestions
      .find((questionList) => questionList.part === selectedPart)
      ?.questions.map((question) => ({ ...question, isLink: !!question.link }));

    const resetData = partQuestion ? partQuestion : [DEFAULT_QUESTION_DATA];

    handleHasDescriptionChange(!!resetData[0].isDescription);

    reset({ questionList: resetData });
  }, [isSuccess, selectedPart, selectedSeason, selectedGroup]);

  const questionList = watch('questionList');

  const {
    fields: questionFileds,
    append,
    insert,
    remove,
  } = useFieldArray({
    control,
    name: 'questionList',
  });

  const addQuestion = () => {
    append(DEFAULT_QUESTION_DATA);
  };

  const deleteQuestion = (index: number) => {
    remove(index);
  };

  const handleDescriptionAdd = () => {
    handleHasDescriptionChange(true);
    insert(0, DEFAULT_DESCRIPTION_DATA);
  };

  return (
    <div className="relative">
      <span className="absolute top-[-4rem] title_6_16_sb text-gray200">{`총 ${questionList?.length}개`}</span>
      {!hasDescription && (
        <Button
          theme="black"
          variant="fill"
          LeftIcon={Add}
          onClick={handleDescriptionAdd}
          className="mb-[3.2rem]"
        >
          설명글 추가하기
        </Button>
      )}
      <ul className="flex flex-col gap-[1.2rem]">
        {questionFileds.map((field, index) => {
          return hasDescription && index === 0 ? (
            <DescriptionBox
              key={field.id}
              onHasDescriptionChange={handleHasDescriptionChange}
              deleteDescription={() => deleteQuestion(0)}
            />
          ) : (
            <QuestionBox
              key={field.id}
              index={index}
              deleteQuestion={() => deleteQuestion(index)}
              hasDescription={hasDescription}
            />
          );
        })}
      </ul>
      <Button
        theme="black"
        variant="fill"
        LeftIcon={Add}
        onClick={addQuestion}
        className="mt-[3.2rem]"
      >
        질문 추가하기
      </Button>
    </div>
  );
};

export default QuestionList;
