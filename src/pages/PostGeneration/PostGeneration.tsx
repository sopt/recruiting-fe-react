import { Button, DialogContext } from '@sopt-makers/ui';
import { useContext, useMemo, useState } from 'react';
import Pagination from '@/components/Pagination';
import YbObRadioGroup from '@/components/YbObRadioGroup';
import { useNav } from '@/contexts/NavContext';
import usePagination from '@/hooks/usePagination';
import GenerationTable from '@/pages/PostGeneration/components/GenerationTable';
import { useGetGeneration } from '@/pages/PostGeneration/hooks/queries';
import type { Group } from '@/pages/PostQuestion/types';
import PostGenerationModal from './components/PostGenerationModal';

const LIMIT = 10;

const PostGeneration = () => {
  const [group, setGroup] = useState<Group>('YB');

  const { isOpen } = useNav();

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
      title: '',
      description: <PostGenerationModal />,
    };
    openDialog(option);
  };

  return (
    <div className="flex flex-col gap-[4.2rem] mt-[3.1rem] overflow-hidden">
      <div
        className={`flex justify-between pr-[12.4rem] transition-all duration-300 ${
          isOpen ? 'pl-[21.2rem]' : 'pl-[12.4rem]'
        }`}
      >
        <YbObRadioGroup group={group} onChange={setGroup} />
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
