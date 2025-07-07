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
import { useGetQuestionList } from '@/pages/PostQuestion/hooks/quries';
import type { GROUP, PART_NAME } from '@/pages/PostQuestion/types';
import TemporarySaveButton from '@/pages/PostQuestion/components/TemporarySaveButton';

const PostQuestion = () => {
  const [hasDescription, setHasDescription] = useState(false);
  const [selectedPart, setSelectedPart] = useState<PART_NAME>('common');
  const [selectedGroup, setSelectedGroup] = useState<GROUP>('YB');
  const [selectedSeason, setSelectedSeason] = useState(36);

  const handlePartChange = (part: PART_NAME) => {
    setSelectedPart(part);
  };

  const handleGroupChange = (group: GROUP) => {
    setSelectedGroup(group);
  };

  const handleSeasonChange = (season: number) => {
    setSelectedSeason(season);
  };

  const questionList = useGetQuestionList(33, 'YB');

  const method = useForm<qustionListTypes>({
    resolver: zodResolver(questionsListSchema),
    defaultValues: {
      questionList: [
        {
          question: '',
          link: '',
          placeholder: '',
          isFile: false,
          charLimit: 100,
        },
      ],
    },
    mode: 'onChange',
  });

  const {
    formState: { isSubmitting, isValid },
  } = method;

  const handleHasDescriptionChange = (bool: boolean) => {
    setHasDescription(bool);
  };

  return (
    <main className="max-w-[98rem]">
      <Header
        selectedGroup={selectedGroup}
        handleTabChange={handlePartChange}
        handleGroupChange={handleGroupChange}
        handleSeasonChange={handleSeasonChange}
      />
      <FormProvider {...method}>
        <form>
          <div className="flex justify-between items-end mb-[2rem]">
            <span className="title_6_16_sb text-gray200">총 2개</span>
            <div className="flex gap-[1.6rem]">
              <TemporarySaveButton
                selectedPart={selectedPart}
                selectedGroup={selectedGroup}
                selectedSeason={selectedSeason}
              />
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
