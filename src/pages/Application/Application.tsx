import Pagination from '@/components/Pagination';
import usePagination from '@/hooks/usePagination';
import type { ApplicantState, PartType } from '@/pages/Application/\btypes';

import ApplicationTable from '@/pages/Application/components/ApplicationTable';
import Filter from '@/pages/Application/components/Filter';
import { PART_TRANSLATOR } from '@/pages/Application/constants';
import { useGetApplicantList } from '@/pages/Application/hooks/queries';

import { Tab } from '@sopt-makers/ui';
import { useMemo, useState } from 'react';

const LIST_LIMIT = 10;
const PAGE_LIMIT = 5;

const Application = () => {
  const [applicantInfo, setApplicantInfo] = useState<ApplicantState>({
    season: '36기',
    group: 'YB',
    isEvaluated: false,
    isDontRead: false,
    isPassedOnly: false,
    selectedPart: 'ALL',
  });

  const updateState = <K extends keyof ApplicantState>(key: K) => {
    return (
      value:
        | ApplicantState[K]
        | ((prev: ApplicantState[K]) => ApplicantState[K]),
    ) => {
      setApplicantInfo((prev) => ({
        ...prev,
        [key]: typeof value === 'function' ? value(prev[key]) : value,
      }));
    };
  };

  const { data } = useGetApplicantList({
    season: Number(applicantInfo.season.split('기')[0]),
    group: applicantInfo.group,
    part: applicantInfo.selectedPart,
    offset: 0,
    limit: LIST_LIMIT,
    minRate: 0,
    hideEvaluated: applicantInfo.isEvaluated,
    hideDontRead: applicantInfo.isDontRead,
    checkInterviewPass: applicantInfo.isPassedOnly,
  });

  const { currentPage, totalPages, handlePageChange } = usePagination({
    totalItems: data?.data.length ?? 0,
    limit: PAGE_LIMIT,
  });

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * PAGE_LIMIT;
    const endIndex = startIndex + PAGE_LIMIT;

    return data?.data.slice(startIndex, endIndex) ?? [];
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-[4.4rem]">
      <Filter
        setSeason={updateState('season')}
        setGroup={updateState('group')}
        setIsEvaluated={updateState('isEvaluated')}
        setIsDontRead={updateState('isDontRead')}
        setIsPassedOnly={updateState('isPassedOnly')}
        {...applicantInfo}
      />
      <Tab
        style="primary"
        size="md"
        tabItems={Object.keys(PART_TRANSLATOR) as PartType[]}
        translator={PART_TRANSLATOR}
        onChange={updateState('selectedPart')}
      />
      <hr className="border-gray800 mt-[-4.7rem] w-[98rem]" />
      <ApplicationTable data={paginatedData} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Application;
