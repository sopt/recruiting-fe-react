import Header from '@/pages/PostQuestion/components/Header';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormProvider, useForm } from 'react-hook-form';
import {
  questionsListSchema,
  type qustionListTypes,
} from '@/pages/PostQuestion/types/form';
import QuestionList from '@/pages/PostQuestion/components/QuestionList';
import TemporarySaveButton from '@/pages/PostQuestion/components/TemporarySaveButton';
import RegisterButton from '@/pages/PostQuestion/components/RegisterButton';
import { DEFAULT_QUESTION_DATA } from '@/pages/PostQuestion/constant';
import { useFilterReducer } from '@/pages/PostQuestion/hooks/useFilterReducer';

const PostQuestion = () => {
  const {
    state: filterState,
    setPart,
    setGroup,
    setSeason,
  } = useFilterReducer();

  const method = useForm<qustionListTypes>({
    resolver: zodResolver(questionsListSchema),
    defaultValues: {
      questionList: [DEFAULT_QUESTION_DATA],
    },
    mode: 'onChange',
  });

  return (
    <main className="max-w-[98rem]">
      <Header
        selectedGroup={filterState.group}
        handleTabChange={setPart}
        handleGroupChange={setGroup}
        handleSeasonChange={setSeason}
      />
      <FormProvider {...method}>
        <form>
          <div className="flex justify-end items-end w-full mb-[2rem]">
            <div className="flex gap-[1.6rem]">
              <TemporarySaveButton filterState={filterState} />
              <RegisterButton filterState={filterState} />
            </div>
          </div>

          <QuestionList filterState={filterState} />
        </form>
      </FormProvider>
    </main>
  );
};

export default PostQuestion;
