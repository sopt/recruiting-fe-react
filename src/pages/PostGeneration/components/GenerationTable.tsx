import { Button, Dialog, DialogContext } from '@sopt-makers/ui';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type React from 'react';
import {
  type RefObject,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { Table } from '@/components/Table';
import { useNav } from '@/contexts/NavContext';
import useDrag from '@/pages/Application/hooks/useDrag';
import { createColumns } from '@/pages/PostGeneration/components/GenerationTableColumns';
import { useDeleteGeneration } from '@/pages/PostGeneration/hooks/queries';
import type { Season } from '@/pages/PostGeneration/types';
import { scrollToLeft } from '@/utils/scroll';

interface GenerationTableProps {
  data: Season[];
}

const HEADER_BASE_STYLE =
  'p-[1rem] text-gray100 body_3_14_m bg-gray700 border-gray600';
const CELL_BASE_STYLE =
  'h-[8rem] text-center body_3_14_m bg-transparent border-b-[1px] border-gray700 align-middle';

const GenerationTable = ({ data }: GenerationTableProps) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { onDragStart, onDragMove, onDragEnd, onDragLeave } =
    useDrag(scrollContainerRef);

  const { openDialog, closeDialog } = useContext(DialogContext);
  const { isOpen } = useNav();

  const { mutate: deleteGeneration } = useDeleteGeneration();

  const handleDeleteGeneration = useCallback(
    (seasonId: number) => {
      deleteGeneration(seasonId);
      closeDialog();
    },
    [deleteGeneration, closeDialog]
  );

  const openDeleteModal = useCallback(
    (seasonId: number) => {
      openDialog({
        title: '기수를 삭제하실 건가요?',
        description: (
          <div className="mb-[2rem] flex flex-col mt-[1.2rem] gap-[3.6rem]">
            <p className="whitespace-pre-line">
              {
                '기수를 삭제하면 해당 기수의 모든 지원서가 삭제됩니다.\n삭제하시겠습니까?'
              }
            </p>
            <Dialog.Footer align="right">
              <Button theme="black" onClick={closeDialog}>
                취소하기
              </Button>
              <Button
                theme="red"
                onClick={() => handleDeleteGeneration(seasonId)}
              >
                삭제하기
              </Button>
            </Dialog.Footer>
          </div>
        ),
      });
    },
    [openDialog, closeDialog, handleDeleteGeneration]
  );

  const columns = useMemo(
    () => createColumns({ onDelete: openDeleteModal }),
    [openDeleteModal]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getRowId: (row) => String(row.id),
  });

  const handleCellClick = useCallback(
    (columnId: string, e: React.MouseEvent) => {
      if (columnId === 'delete') {
        e.stopPropagation();
      }
    },
    []
  );

  const handleCellKeyDown = useCallback(
    (columnId: string, e: React.KeyboardEvent) => {
      if (columnId === 'delete' && (e.key === 'Enter' || e.key === ' ')) {
        e.stopPropagation();
      }
    },
    []
  );

  useEffect(() => {
    scrollToLeft(scrollContainerRef as RefObject<HTMLElement>);
  }, [data]);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: 테이블 스크롤 기능
    <div
      ref={scrollContainerRef}
      onMouseDown={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('[data-dropdown]')) {
          return;
        }
        onDragStart(e);
      }}
      onMouseMove={onDragMove}
      onMouseUp={onDragEnd}
      onMouseLeave={onDragLeave}
      className={`w-full overflow-x-auto scroll-smooth scrollbar-hide pr-[12.4rem] cursor-grab active:cursor-grabbing transition-all duration-300 ${
        isOpen ? 'pl-[21.2rem]' : 'pl-[12.4rem]'
      }`}
    >
      <div className="w-[122.5rem]">
        <Table<Season>
          table={table}
          emptyMessage="기수를 추가하세요."
          headerBaseClassName={HEADER_BASE_STYLE}
          cellBaseClassName={CELL_BASE_STYLE}
          onCellClick={handleCellClick}
          onCellKeyDown={handleCellKeyDown}
        />
      </div>
    </div>
  );
};

export default GenerationTable;
