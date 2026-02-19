import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AlertTriangleFilled } from '@/assets/svg';
import { useSeasonGroup } from '@/contexts/SeasonGroupContext';
import { useIntersectionObserver } from '@/hooks/useIntersectorObservor';
import type { PartType, SoptPartType } from '@/pages/Application/\btypes';
import { COMMON_QUESTION } from '@/pages/Application/constants';
import Header from '@/pages/PostQuestion/components/Header';
import PreviewButton from '@/pages/PostQuestion/components/PreviewButton';
import QuestionList from '@/pages/PostQuestion/components/QuestionList';
import RegisterButton from '@/pages/PostQuestion/components/RegisterButton';
import TemporarySaveButton from '@/pages/PostQuestion/components/TemporarySaveButton';
import { DEFAULT_QUESTION_DATA } from '@/pages/PostQuestion/constant';
import { useGetQuestionList } from '@/pages/PostQuestion/hooks/queries';
import { useFilterReducer } from '@/pages/PostQuestion/hooks/useFilterReducer';
import type { Group } from '@/pages/PostQuestion/types';
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

  const { season: globalSeason, group: globalGroup, setSeason: setGlobalSeason, setGroup: setGlobalGroup } =
    useSeasonGroup();

  const {
    state: filterState,
    setPart,
    setGroup: setLocalGroup,
    setSeason: setLocalSeason,
  } = useFilterReducer({
    season: globalSeason > 0 ? globalSeason : 0,
    group: globalGroup || 'YB',
  });

  const setGroup = (group: Group) => {
    setLocalGroup(group);
    setGlobalGroup(group);
  };

  const setSeason = (season: number) => {
    setLocalSeason(season);
    setGlobalSeason(season);
  };

  const { data: questionListData } = useGetQuestionList(
    filterState.season,
    filterState.group
  );

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

  // 전역 상태가 변경될 때 로컬 상태 동기화
  useEffect(() => {
    if (globalSeason > 0 && filterState.season !== globalSeason) {
      setLocalSeason(globalSeason);
    }
    if (globalGroup && filterState.group !== globalGroup) {
      setLocalGroup(globalGroup);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [globalSeason, globalGroup]);

  useEffect(() => {
    if (!questionListData) return;

    const partQuestions =
      filterState.part === COMMON_QUESTION
        ? questionListData.commonQuestions
        : questionListData.partQuestions.find(
            (questionList) => questionList.part === filterState.part
          )?.questions;

    setIsPreviewEnabled(
      partQuestions?.some((question) => question.id != null) ?? false
    );
  }, [questionListData, filterState.part]);

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
