import Pagination from '@/components/Pagination';
import YbObRadioGroup from '@/components/YbObRadioGroup';
import usePagination from '@/hooks/usePagination';
import { useContext, useState } from 'react';

import GenerationTable from '@/pages/PostGeneration/components/GenerationTable';

import { useGetGeneration } from '@/pages/PostGeneration/hooks/queries';
import type { GROUP } from '@/pages/PostQuestion/types';
import { Button, DialogContext } from '@sopt-makers/ui';
import { useMemo } from 'react';
import PostGenerationModal from './components/PostGenerationModal';

const LIMIT = 10;

const PostGeneration = () => {
  const [group, setGroup] = useState<GROUP>('YB');

  const { data: generationData } = useGetGeneration(group);

  const { currentPage, totalPages, handlePageChange } = usePagination({
    totalItems: generationData?.seasons.length ?? 0,
    limit: LIMIT,
  });

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * LIMIT;
    const endIndex = startIndex + LIMIT;

    return generationData?.seasons.slice(startIndex, endIndex);
  }, [currentPage, generationData, group]);

  const { openDialog } = useContext(DialogContext);

  const handleAddGeneration = () => {
    const option = {
      title: '신규 기수 등록',
      description: <PostGenerationModal />,
    };
    openDialog(option);
  };

  return (
    <div className="flex flex-col gap-[4.2rem] mt-[3.1rem] overflow-hidden">
      <div className="flex justify-between pr-[12.4rem]">
        <YbObRadioGroup group={group} setGroup={setGroup} />
        <Button variant="fill" onClick={handleAddGeneration}>
          기수 추가
        </Button>
      </div>
      <GenerationTable data={paginatedData ?? []} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default PostGeneration;
