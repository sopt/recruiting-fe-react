import { Add } from '@/assets/svg';
import QuestionBox from '@/pages/PostQuestion/components/QuestionBox';
import { DEFAULT_QUESTION_DATA } from '@/pages/PostQuestion/constant';

import { useFieldArray, useFormContext } from 'react-hook-form';

const QuestionList = () => {
  const { control } = useFormContext();

  const {
    fields: questionFileds,
    append,
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

  return (
    <>
      <ul className="flex flex-col gap-[1.2rem]">
        {questionFileds.map((_, index) => (
          <QuestionBox
            key={index}
            index={index}
            deleteQuestion={() => deleteQuestion(index)}
          />
        ))}
      </ul>
      <button
        type="button"
        onClick={addQuestion}
        className="flex flex-row gap-[0.4rem] mt-[3.2rem] px-[2rem] py-[1.2rem] rounded-[10px] bg-gray700 label_2_16_sb cursor-pointer"
      >
        <Add width={20} />
        질문 추가하기
      </button>
    </>
  );
};

export default QuestionList;
