import { useEffect, useState } from 'react';
import Header from '@/pages/PostQuestion/components/Header';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import {
  questionsListSchema,
  type qustionListTypes,
} from '@/pages/PostQuestion/types/form';
import QuestionList from '@/pages/PostQuestion/components/QuestionList';
import type { Group, PartName } from '@/pages/PostQuestion/types';
import TemporarySaveButton from '@/pages/PostQuestion/components/TemporarySaveButton';
import RegisterButton from '@/pages/PostQuestion/components/RegisterButton';
import { DEFAULT_QUESTION_DATA } from '@/pages/PostQuestion/constant';
import { useGetQuestionList } from '@/pages/PostQuestion/hooks/quries';

const PostQuestion = () => {
  const [selectedPart, setSelectedPart] = useState<PartName>('common');
  const [selectedGroup, setSelectedGroup] = useState<Group>('YB');
  const [selectedSeason, setSelectedSeason] = useState(33);
  const [hasDescription, setHasDescription] = useState(false);

  const { data: questionListData } = useGetQuestionList(
    selectedSeason,
    selectedGroup,
  );

  const partQuestion = questionListData?.partQuestions.filter(
    (questionList) => questionList.part === selectedPart,
  );

  const newpartQuestion = partQuestion[0]?.questions.map((question) => {
    if (question.link) {
      return { ...question, isLink: true };
    }
    return question;
  });

  const method = useForm<qustionListTypes>({
    resolver: zodResolver(questionsListSchema),
    defaultValues: {
      questionList: newpartQuestion ? newpartQuestion : [DEFAULT_QUESTION_DATA],
    },
    mode: 'onChange',
  });

  useEffect(() => {
    const partQuestion = questionListData?.partQuestions.filter(
      (questionList) => questionList.part === selectedPart,
    );

    const newpartQuestion = partQuestion[0]?.questions.map((question) => {
      if (question.link) {
        return { ...question, isLink: true };
      }
      return question;
    });
    const resetData = newpartQuestion
      ? newpartQuestion
      : [DEFAULT_QUESTION_DATA];

    if (resetData[0].isDescription) {
      handleHasDescriptionChange(true);
    } else {
      handleHasDescriptionChange(false);
    }

    reset({ questionList: resetData });
  }, [selectedPart]);

  const { watch, reset } = method;
  const questionList = watch('questionList');
  console.log(watch());

  const handlePartChange = (part: PartName) => {
    setSelectedPart(part);
  };

  const handleGroupChange = (group: Group) => {
    setSelectedGroup(group);
  };

  const handleSeasonChange = (season: number) => {
    setSelectedSeason(season);
  };

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
            <span className="title_6_16_sb text-gray200">{`총 ${questionList?.length}개`}</span>
            <div className="flex gap-[1.6rem]">
              <TemporarySaveButton
                selectedPart={selectedPart}
                selectedGroup={selectedGroup}
                selectedSeason={selectedSeason}
              />
              <RegisterButton
                selectedPart={selectedPart}
                selectedGroup={selectedGroup}
                selectedSeason={selectedSeason}
              />
            </div>
          </div>

          <QuestionList
            handleHasDescriptionChange={handleHasDescriptionChange}
            hasDescription={hasDescription}
          />
        </form>
      </FormProvider>
    </main>
  );
};

export default PostQuestion;
