import { Tab } from '@sopt-makers/ui';
import { useEffect, useState } from 'react';
import Pagination from '@/components/Pagination';
import { IS_SOPT } from '@/constants';
import { useNav } from '@/contexts/NavContext';
import {
  type ApplicantState,
  Part,
  type PartType,
  SoptPart,
  type SoptPartType,
} from '@/pages/Application/\btypes';
import ApplicationTable from '@/pages/Application/components/ApplicationTable';
import Filter from '@/pages/Application/components/Filter';
import { COMMON_QUESTION } from '@/pages/Application/constants';
import { useGetApplicantList } from '@/pages/Application/hooks/queries';
import { useGetGeneration } from '@/pages/PostGeneration/hooks/queries';

const PAGE_LIMIT = 10;

const INITIAL_APPLICANT_INFO: ApplicantState = {
  season: '',
  group: 'YB',
  dontReadInfo: {
    checkedByMe: false,
  },
  evaluatedInfo: {
    checkedByMe: false,
  },
  isPassedOnly: false,
  selectedPart: COMMON_QUESTION,
  minRate: 0,
};

const tabItems = IS_SOPT
  ? (Object.keys(SoptPart) as SoptPartType[])
  : (Object.keys(Part) as PartType[]);

const Application = () => {
  const [applicantInfo, setApplicantInfo] = useState<ApplicantState>(
    INITIAL_APPLICANT_INFO
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [searchApplicantValue, setSearchApplicantValue] = useState('');

  const { isOpen } = useNav();

  const { data: generationData } = useGetGeneration(applicantInfo.group);

  const applicantListParams = {
    season: Number(applicantInfo.season),
    group: applicantInfo.group,
    offset: (currentPage - 1) * PAGE_LIMIT,
    limit: PAGE_LIMIT,
    minRate: applicantInfo.minRate,
    hideDontRead: applicantInfo.dontReadInfo.checkedByMe,
    hideEvaluated: applicantInfo.evaluatedInfo.checkedByMe,
    checkInterviewPass: applicantInfo.isPassedOnly,
    ...(applicantInfo.selectedPart !== COMMON_QUESTION && {
      part: applicantInfo.selectedPart,
    }),
  };

  const { data: applicantList, isLoading } =
    useGetApplicantList(applicantListParams);

  const totalPages =
    applicantList?.data.meta.totalPage ??
    Math.ceil((applicantList?.data.meta.total ?? 0) / PAGE_LIMIT);

  useEffect(() => {
    if (generationData.seasons.length > 0) {
      setApplicantInfo((prev) => ({
        ...prev,
        season: generationData.seasons[0].season.toString(),
      }));
    }
  }, [generationData]);

  useEffect(() => {
    setCurrentPage(1);
  }, [
    applicantInfo.season,
    applicantInfo.group,
    applicantInfo.dontReadInfo.checkedByMe,
    applicantInfo.evaluatedInfo.checkedByMe,
    applicantInfo.isPassedOnly,
    applicantInfo.selectedPart,
    applicantInfo.minRate,
  ]);

  return (
    <>
      <div className="flex flex-col gap-[4.4rem] overflow-hidden">
        <div
          className={`flex flex-col gap-[4.4rem] justify-between pr-[12.4rem] transition-all duration-300 ${
            isOpen ? 'pl-[21.2rem]' : 'pl-[12.4rem]'
          }`}
        >
          <Filter
            generationData={generationData}
            applicantInfo={applicantInfo}
            searchApplicantValue={searchApplicantValue}
            setApplicantInfo={setApplicantInfo}
            onSearchChange={(value) => {
              setSearchApplicantValue(value);
            }}
          />
          <Tab
            style="primary"
            size="md"
            tabItems={tabItems}
            onChange={(selectedPart) => {
              setApplicantInfo((prev) => ({ ...prev, selectedPart }));
              setCurrentPage(1);
            }}
          />
        </div>
        <hr
          className={`border-gray800 mt-[-4.7rem] w-[98rem] transition-all duration-300 ${
            isOpen ? 'ml-[21.2rem]' : 'ml-[12.4rem]'
          }`}
        />
        <ApplicationTable
          data={applicantList?.data.data ?? []}
          isLoading={isLoading}
        />
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default Application;
