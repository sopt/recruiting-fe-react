import { ChevronLeft } from '@/assets/svg';
import Profile from '@/pages/ApplicationDetail/components/Profile';
import QnaList from '@/pages/ApplicationDetail/components/QnaList';

import { useGetApplicantDetail } from '@/pages/ApplicationDetail/hooks/quries';
import { ROUTES_CONFIG } from '@/routes/routeConfig';
import { Tab } from '@sopt-makers/ui';

import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

type questionCategoryType = 'common' | 'part';

const ApplicationDetail = () => {
  const [searchParams] = useSearchParams();

  const applicantId = searchParams.get('id') ?? 0;

  const { data: applicationDetailData } = useGetApplicantDetail(+applicantId);

  const [questionCategory, setQuestionCategory] =
    useState<questionCategoryType>('common');

  const handleTabChange = (tab: questionCategoryType) => {
    setQuestionCategory(tab);
  };

  const navigate = useNavigate();

  const goApplicantPage = () => {
    navigate(ROUTES_CONFIG.application.path);
  };

  return (
    <div className="flex flex-col gap-[4.8rem] w-[98rem] p-[2.4rem] mt-[3rem] mb-[16.2rem] rounded-[14px] bg-gray900  ">
      <header className="flex flex-row gap-[1.8rem] align-center h-[3.6rem]">
        <button
          type="button"
          onClick={goApplicantPage}
          className="flex align-middle justify-center p-[0.8rem] rounded-[100px] bg-gray700 cursor-pointer"
        >
          <ChevronLeft width={20} />
        </button>
        <h2 className="title_4_20_sb">{`${applicationDetailData.applicant.season}기 ${applicationDetailData.applicant.group}`}</h2>
      </header>

      <div className="flex flex-col gap-[3.2rem] mx-[13rem]">
        <Profile profileData={applicationDetailData?.applicant} />
        <div className="custom-tab mt-[4rem]">
          <Tab
            selectedInitial="common"
            size="lg"
            style="secondary"
            tabItems={['common', 'part']}
            translator={{
              common: '공통 질문',
              part: '파트별 질문',
            }}
            onChange={handleTabChange}
          />
        </div>

        <QnaList
          questions={
            questionCategory === 'common'
              ? applicationDetailData?.commonQuestions
              : applicationDetailData?.partQuestions
          }
        />
      </div>
    </div>
  );
};

export default ApplicationDetail;
