import Pagination from '@/components/Pagination';
import { DUMMY_APPLICATION_DATA } from '@/constants/dummy';
import usePagination from '@/hooks/usePagination';
import type { PartType } from '@/pages/Application/\btypes';

import ApplicationTable from '@/pages/Application/components/ApplicationTable';
import Filter from '@/pages/Application/components/Filter';
import { PART_TRANSLATOR } from '@/pages/Application/constants';
import { Tab } from '@sopt-makers/ui';
import { useMemo, useState } from 'react';

const LIMIT = 5;

const Application = () => {
  const [isCompleteHidden, setIsCompleteHidden] = useState(false);
  const [isDoNotRead, setIsDoNotRead] = useState(false);
  const [isPassedOnly, setIsPassedOnly] = useState(false);
  const [, setSelectedPart] = useState<PartType>('all');

  const { currentPage, totalPages, handlePageChange } = usePagination({
    totalItems: DUMMY_APPLICATION_DATA.length,
    limit: LIMIT,
  });

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * LIMIT;
    const endIndex = startIndex + LIMIT;

    return DUMMY_APPLICATION_DATA.slice(startIndex, endIndex);
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-[4.4rem]">
      <Filter
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
