import { Add } from '@/assets/svg';
import DescriptionBox from '@/pages/PostQuestion/components/DescriptionBox';
import QuestionBox from '@/pages/PostQuestion/components/QuestionBox';
import {
  DEFAULT_DESCRIPTION_DATA,
  DEFAULT_QUESTION_DATA,
} from '@/pages/PostQuestion/constant';

import { Button } from '@sopt-makers/ui';

import { useFieldArray, useFormContext } from 'react-hook-form';

interface QuestionListProps {
  hasDescription: boolean;
  handleHasDescriptionChange: (bool: boolean) => void;
}

const QuestionList = ({
  hasDescription,
  handleHasDescriptionChange,
}: QuestionListProps) => {
  const { control } = useFormContext();

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
    <>
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
    </>
  );
};

export default QuestionList;
