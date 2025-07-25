import Pagination from '@/components/Pagination';
import usePagination from '@/hooks/usePagination';
import type { ApplicantState, PartType } from '@/pages/Application/\btypes';
import ApplicationTable from '@/pages/Application/components/ApplicationTable';
import Filter from '@/pages/Application/components/Filter';
import { PART_TRANSLATOR } from '@/pages/Application/constants';
import { useGetApplicantList } from '@/pages/Application/hooks/queries';
import { useGetGeneration } from '@/pages/PostGeneration/hooks/queries';
import { Tab } from '@sopt-makers/ui';
import { useState } from 'react';
import { useMemo } from 'react';
import { useEffect } from 'react';

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
  selectedPart: '전체',
  minRate: 0,
};

const Application = () => {
  const [applicantInfo, setApplicantInfo] = useState<ApplicantState>(
    INITIAL_APPLICANT_INFO,
  );

  const { data: generationData } = useGetGeneration(applicantInfo.group);

  const applicantListParams = {
    season: Number(applicantInfo.season),
    group: applicantInfo.group,
    offset: 0,
    limit: PAGE_LIMIT,
    minRate: applicantInfo.minRate,
    hideDontRead: applicantInfo.dontReadInfo.checkedByMe,
    hideEvaluated: applicantInfo.evaluatedInfo.checkedByMe,
    checkInterviewPass: applicantInfo.isPassedOnly,
    ...(applicantInfo.selectedPart !== '전체' && {
      part: applicantInfo.selectedPart,
    }),
  };

  const { data: applicantList, refetch } =
    useGetApplicantList(applicantListParams);

  const { currentPage, totalPages, handlePageChange } = usePagination({
    totalItems: applicantList?.data.data.length ?? 0,
    limit: PAGE_LIMIT,
  });

  const paginatedData = useMemo(() => {
    const arr = Array.isArray(applicantList?.data.data)
      ? applicantList.data.data
      : [];
    const startIndex = (currentPage - 1) * PAGE_LIMIT;
    const endIndex = startIndex + PAGE_LIMIT;

    return arr.slice(startIndex, endIndex);
  }, [currentPage, applicantList?.data]);

  useEffect(() => {
    if (generationData.seasons.length > 0) {
      setApplicantInfo((prev) => ({
        ...prev,
        season: generationData.seasons[0].season.toString(),
      }));
    }
  }, [generationData]);

  return (
    <>
      <div className="flex flex-col gap-[4.4rem] overflow-hidden">
        <div className="flex flex-col gap-[4.4rem] justify-between pr-[12.4rem] pl-[21.2rem]">
          <Filter
            generationData={generationData}
            applicantInfo={applicantInfo}
            setApplicantInfo={setApplicantInfo}
            onRefresh={refetch}
          />
          <Tab
            style="primary"
            size="md"
            tabItems={Object.keys(PART_TRANSLATOR) as PartType[]}
            onChange={(selectedPart) =>
              setApplicantInfo((prev) => ({ ...prev, selectedPart }))
            }
          />
        </div>
        <hr className="border-gray800 mt-[-4.7rem] w-[98rem] ml-[21.2rem]" />
        <ApplicationTable data={paginatedData ?? []} />
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default Application;
