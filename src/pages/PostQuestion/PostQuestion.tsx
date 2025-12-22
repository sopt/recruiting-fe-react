import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AlertTriangleFilled } from '@/assets/svg';
import { useIntersectionObserver } from '@/hooks/useIntersectorObservor';
import type { PartType, SoptPartType } from '@/pages/Application/\btypes';
import Header from '@/pages/PostQuestion/components/Header';
import PreviewButton from '@/pages/PostQuestion/components/PreviewButton';
import QuestionList from '@/pages/PostQuestion/components/QuestionList';
import RegisterButton from '@/pages/PostQuestion/components/RegisterButton';
import TemporarySaveButton from '@/pages/PostQuestion/components/TemporarySaveButton';
import { DEFAULT_QUESTION_DATA } from '@/pages/PostQuestion/constant';
import { useFilterReducer } from '@/pages/PostQuestion/hooks/useFilterReducer';
import {
  questionsListSchema,
  type qustionListTypes,
} from '@/pages/PostQuestion/types/form';
import { scrollToTop } from '@/utils/scroll';

const PostQuestion = () => {
  const [deleteQuestionIds, setDeleteQuestionIds] = useState<number[]>([]);
  const [isPreviewEnabled, setIsPreviewEnabled] = useState(false);

  const addDeleteQuestionId = (id: number) => {
    setDeleteQuestionIds((prev) => [...prev, id]);
  };

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

  const {
    formState: { isDirty },
  } = method;

  const { targetRef } = useIntersectionObserver({
    rootMargin: '-80px 0px 0px 0px',
  });

  const handleTabChange = (part: PartType | SoptPartType) => {
    setPart(part);
    scrollToTop();
  };

  return (
    <main className="max-w-[98rem] mb-[15rem] transition-all duration-300">
      <Header
        filterState={filterState}
        handleTabChange={handleTabChange}
        handleGroupChange={setGroup}
        handleSeasonChange={setSeason}
        targetRef={targetRef}
      />
      {/* 추후 드롭다운 기능시 사용 */}
      {/* {!isIntersecting && (
        <div className={isDirty ? 'h-[14rem]' : 'h-[11rem]'} />
      )} */}
      <FormProvider {...method}>
        <form>
          <div className="flex flex-col justify-end items-end w-full mb-[2rem]">
            <div className="flex flex-col gap-[0.8rem] body_3_14_r">
              <div className="flex gap-[1.6rem] mt-[4.4rem] items-center z-50">
                <PreviewButton disabled={!isPreviewEnabled} />
                <TemporarySaveButton
                  filterState={filterState}
                  deleteQuestionIds={deleteQuestionIds}
                  onActivatePreview={() => setIsPreviewEnabled(true)}
                />
                <RegisterButton
                  filterState={filterState}
                  deleteQuestionIds={deleteQuestionIds}
                  onActivatePreview={() => setIsPreviewEnabled(true)}
                />
              </div>
              {isDirty && (
                <div className="flex gap-[0.4rem] align-middle text-error">
                  <AlertTriangleFilled width={16} />
                  <span>저장되지 않은 변경사항이 있습니다.</span>
                </div>
              )}
            </div>
          </div>

          <QuestionList
            filterState={filterState}
            addDeleteQuestionId={addDeleteQuestionId}
          />
        </form>
      </FormProvider>
    </main>
  );
};

export default PostQuestion;
