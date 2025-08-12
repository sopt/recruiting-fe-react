import { Button } from '@sopt-makers/ui';
import { useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import { Add } from '@/assets/svg';
import { COMMON_QUESTION } from '@/pages/Application/constants';
import DescriptionBox from '@/pages/PostQuestion/components/DescriptionBox';
import QuestionBox from '@/pages/PostQuestion/components/QuestionBox';
import {
  DEFAULT_DESCRIPTION_DATA,
  DEFAULT_QUESTION_DATA,
} from '@/pages/PostQuestion/constant';
import { useGetQuestionList } from '@/pages/PostQuestion/hooks/quries';
import type { FilterState } from '@/pages/PostQuestion/hooks/useFilterReducer';

interface QuestionListProps {
  filterState: FilterState;
  addDeleteQuestionId: (id: number) => void;
}

const QuestionList = ({
  filterState,
  addDeleteQuestionId,
}: QuestionListProps) => {
  const [hasDescription, setHasDescription] = useState(false);

  const { data: questionListData, isSuccess } = useGetQuestionList(
    filterState.season,
    filterState.group,
  );

  const { control, reset, watch } = useFormContext();

  const {
    fields: questionFields,
    append,
    insert,
    remove,
  } = useFieldArray({
    control,
    name: 'questionList',
  });

  useEffect(() => {
    const partQuestions =
      filterState.part === COMMON_QUESTION
        ? questionListData?.commonQuestions
        : questionListData?.partQuestions.find(
            (questionList) => questionList.part === filterState.part,
          )?.questions;

    const resetData = partQuestions ? partQuestions : [DEFAULT_QUESTION_DATA];

    setHasDescription(!!resetData[0]?.isDescription);

    reset({ questionList: resetData });
  }, [
    questionListData,
    isSuccess,
    filterState.group,
    filterState.part,
    filterState.season,
  ]);

  const questionList = watch('questionList');

  useEffect(() => {
    if (questionList?.length === 0) {
      append(DEFAULT_QUESTION_DATA);
    }
  }, [questionList]);

  const addQuestion = () => {
    append(DEFAULT_QUESTION_DATA);
  };

  const deleteQuestion = (index: number, id: number) => {
    remove(index);
    addDeleteQuestionId(id);
    if (index === 0) {
      setHasDescription(false);
    }
  };

  const handleDescriptionAdd = () => {
    setHasDescription(true);
    insert(0, DEFAULT_DESCRIPTION_DATA);
  };

  return (
    <div className="relative">
      <span className="absolute top-[-4rem] title_6_16_sb text-gray200">{`총 ${questionList?.length}개`}</span>
      {!(hasDescription || questionList[0]?.isActive) && (
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
        {questionFields.map((field, index) => {
          return hasDescription && index === 0 ? (
            <DescriptionBox
              key={field.id}
              deleteDescription={() =>
                deleteQuestion(0, questionList[index].id)
              }
            />
          ) : (
            <QuestionBox
              key={field.id}
              index={index}
              deleteQuestion={() =>
                deleteQuestion(index, questionList[index].id)
              }
              hasDescription={hasDescription}
            />
          );
        })}
      </ul>
      {!questionList[0]?.isActive && (
        <Button
          theme="black"
          variant="fill"
          LeftIcon={Add}
          onClick={addQuestion}
          className="mt-[3.2rem]"
        >
          질문 추가하기
        </Button>
      )}
    </div>
  );
};

export default QuestionList;
