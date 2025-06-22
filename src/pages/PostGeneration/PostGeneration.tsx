import Pagination from '@/components/Pagination';
import YbObRadioGroup from '@/components/YbObRadioGroup';
import { MOCK_GENERATION_DATA } from '@/constants/generation';
import usePagination from '@/hooks/usePagination';

import GenerationTable from '@/pages/PostGeneration/components/GenerationTable';

import { Button } from '@sopt-makers/ui';
import { useMemo } from 'react';

const LIMIT = 10;

const PostGeneration = () => {
  const { currentPage, totalPages, handlePageChange } = usePagination({
    totalItems: MOCK_GENERATION_DATA.length,
    limit: LIMIT,
  });

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * LIMIT;
    const endIndex = startIndex + LIMIT;

    return MOCK_GENERATION_DATA.slice(startIndex, endIndex);
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-[4.2rem] mt-[3.1rem] overflow-hidden">
      <div className="flex justify-between pr-[12.4rem]">
        <YbObRadioGroup />
        <Button variant="fill">기수 추가</Button>
      </div>
      <GenerationTable data={paginatedData} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PostGeneration;
