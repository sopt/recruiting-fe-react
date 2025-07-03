import Pagination from '@/components/Pagination';
import usePagination from '@/hooks/usePagination';
import type { PartType } from '@/pages/Application/\btypes';

import ApplicationTable from '@/pages/Application/components/ApplicationTable';
import Filter from '@/pages/Application/components/Filter';
import { PART_TRANSLATOR } from '@/pages/Application/constants';
import { useGetApplicantList } from '@/pages/Application/hooks/queries';

import type { GROUP } from '@/pages/Question/types';
import { Tab } from '@sopt-makers/ui';
import { useMemo, useState } from 'react';

const LIMIT = 5;

const Application = () => {
  const [season, setSeason] = useState('36기');
  const [group, setGroup] = useState<GROUP>('YB');
  const [isCompleteHidden, setIsCompleteHidden] = useState(false);
  const [isDoNotRead, setIsDoNotRead] = useState(false);
  const [isPassedOnly, setIsPassedOnly] = useState(false);
  const [selectedPart, setSelectedPart] = useState<PartType>('WEB');

  const { data } = useGetApplicantList({
    season: Number(season.split('기')[0]),
    group,
    part: selectedPart,
    offset: 0,
    limit: 10,
    minRate: 0,
    hideEvaluated: false,
    hideDontRead: false,
    checkInterviewPass: false,
    isCompleteHidden,
    isDoNotRead,
    isPassedOnly,
  });

  const { currentPage, totalPages, handlePageChange } = usePagination({
    totalItems: data?.data.length ?? 0,
    limit: LIMIT,
  });

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * LIMIT;
    const endIndex = startIndex + LIMIT;

    return data?.data.slice(startIndex, endIndex) ?? [];
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-[4.4rem]">
      <Filter
        season={season}
        setSeason={setSeason}
        group={group}
        setGroup={setGroup}
        isCompleteHidden={isCompleteHidden}
        isDoNotRead={isDoNotRead}
        isPassedOnly={isPassedOnly}
        setIsCompleteHidden={setIsCompleteHidden}
        setIsDoNotRead={setIsDoNotRead}
        setIsPassedOnly={setIsPassedOnly}
      />
      <Tab
        style="primary"
        size="md"
        tabItems={Object.keys(PART_TRANSLATOR) as PartType[]}
        translator={PART_TRANSLATOR}
        onChange={(part: PartType) => setSelectedPart(part)}
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
