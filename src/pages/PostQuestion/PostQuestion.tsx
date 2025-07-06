import { Add } from '@/assets/svg';
import DescriptionBox from '@/pages/PostQuestion/components/DescriptionBox';
import { Button } from '@sopt-makers/ui';
import { useState } from 'react';
import Header from '@/pages/PostQuestion/components/Header';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import {
  questionsListSchema,
  type qustionListTypes,
} from '@/pages/PostQuestion/types/form';
import QuestionList from '@/pages/PostQuestion/components/QuestionList';
import {
  useGetQuestionList,
  usePostQuestionsSave,
} from '@/pages/PostQuestion/hooks/quries';
import type { GROUP, PART_NAME } from '@/pages/PostQuestion/types';

const PostQuestion = () => {
  const [hasDescription, setHasDescription] = useState(false);
  const [selectedPart, setSelectedPart] = useState<PART_NAME>();

  const handleTabChange = (part: PART_NAME) => {
    setSelectedPart(part);
  };

  const questionList = useGetQuestionList(36, 'YB');

  const { mutate: saveMutate } = usePostQuestionsSave();

  const method = useForm<qustionListTypes>({
    resolver: zodResolver(questionsListSchema),
    defaultValues: {
      questionList: [
        {
          question: '',
          link: '',
          placeholder: '',
          file: '',
          charLimit: 100,
        },
      ],
    },
    mode: 'onChange',
  });

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting, isValid },
  } = method;
  const check = watch('questionList');

  const handleQuetsionsSave = (data: qustionListTypes) => {
    console.log(data);
    const questions = data.questionList.map((question, index) => {
      return {
        id: index,
        questionOrder: index,
        part: selectedPart as PART_NAME,
        content: question.question,
        isDescription: false,
        charLimit: question.charLimit,
        required: true,
        link: question.link,
        placeholder: question.placeholder,
        isFile: true,
      };
    });

    const requestData = {
      season: 36,
      group: 'YB' as GROUP,
      questions: questions,
      deleteQuestionIdList: [],
    };

    saveMutate(requestData);
  };

  const handleHasDescriptionChange = (bool: boolean) => {
    setHasDescription(bool);
  };

  return (
    <main className="max-w-[98rem]">
      <FormProvider {...method}>
        <form>
          <Header handleTabChange={handleTabChange} />
          <div className="flex justify-between items-end mb-[2rem]">
            <span className="title_6_16_sb text-gray200">총 2개</span>
            <div className="flex gap-[1.6rem]">
              <Button
                type="button"
                variant="outlined"
                size="md"
                onClick={handleSubmit(handleQuetsionsSave)}
                disabled={isSubmitting || !isValid}
              >
                임시저장
              </Button>
              <Button
                variant="fill"
                size="md"
                disabled={isSubmitting || !isValid}
              >
                최종 등록하기
              </Button>
            </div>
          </div>

          {hasDescription ? (
            <DescriptionBox
              onHasDescriptionChange={handleHasDescriptionChange}
            />
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
        </form>
      </FormProvider>
    </main>
  );
};

export default PostQuestion;
