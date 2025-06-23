import { Add } from '@/assets/svg';
import DescriptionBox from '@/pages/Question/components/DescriptionBox';
import { Button } from '@sopt-makers/ui';
import { useState } from 'react';
import Header from '@/pages/Question/components/Header';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import {
  questionsListSchema,
  type qustionListTypes,
} from '@/pages/Question/types/form';
import QuestionList from '@/pages/Question/components/QuestionList';

const Question = () => {
  const [hasDescription, setHasDescription] = useState(false);

  const method = useForm<qustionListTypes>({
    resolver: zodResolver(questionsListSchema),
    defaultValues: {
      questionList: [
        {
          question: '',
          link: '',
          answerPlaceHolder: '',
          file: '',
          maxText: 100,
        },
      ],
    },
    mode: 'onChange',
  });

  const handleHasDescriptionChange = (bool: boolean) => {
    setHasDescription(bool);
  };

  return (
    <main className="max-w-[98rem]">
      <FormProvider {...method}>
        <Header />
        <div className="flex justify-between items-end mb-[2rem]">
          <span className="title_6_16_sb text-gray200">총 2개</span>
          <div className="flex gap-[1.6rem]">
            <Button variant="outlined" size="md">
              임시저장
            </Button>
            <Button variant="fill" size="md">
              최종 등록하기
            </Button>
          </div>
        </div>

        {hasDescription ? (
          <DescriptionBox onHasDescriptionChange={handleHasDescriptionChange} />
        ) : (
          <button
            type="button"
            onClick={() => handleHasDescriptionChange(true)}
            className="flex flex-row gap-[0.4rem] mb-[3.2rem] px-[2rem] py-[1.2rem] rounded-[10px] bg-gray700 label_2_16_sb cursor-pointer"
          >
            <Add width={20} />
            설명글 추가하기
          </button>
        )}

        <QuestionList />
      </FormProvider>
    </main>
  );
};

export default Question;
