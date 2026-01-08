import type { ColumnDef } from '@tanstack/react-table';
import { Trash } from '@/assets/svg';
import type { Season } from '@/pages/PostGeneration/types';
import {
  canDeleteGeneration,
  formatFullDate,
} from '@/pages/PostGeneration/utils';

type ColumnProps = {
  onDelete: (seasonId: number) => void;
};

export const createColumns = (props: ColumnProps): ColumnDef<Season>[] => {
  const { onDelete } = props;

  return [
    {
      id: 'season',
      header: '기수',
      cell: ({ row }) => (
        <div className="h-full flex items-center justify-center">
          {row.original.season}
        </div>
      ),
      size: 110,
    },
    {
      id: 'name',
      header: '이름',
      cell: ({ row }) => (
        <div className="h-full flex items-center justify-center">
          {row.original.name}
        </div>
      ),
      size: 140,
    },
    {
      id: 'applicationPeriod',
      header: '서류 지원 기간',
      cell: ({ row }) => (
        <div className="h-full flex items-center justify-evenly gap-[0.5rem] p-[1.5rem]">
          <p>{formatFullDate(row.original.applicationStart)}</p>
          <p>~</p>
          <p>{formatFullDate(row.original.applicationEnd)}</p>
        </div>
      ),
      size: 315,
    },
    {
      id: 'applicationResultPeriod',
      header: '서류 결과 확인 기간',
      cell: ({ row }) => (
        <div className="h-full flex items-center justify-evenly gap-[0.5rem] p-[1.5rem]">
          <p>{formatFullDate(row.original.applicationResultStart)}</p>
          <p>~</p>
          <p>{formatFullDate(row.original.applicationResultEnd)}</p>
        </div>
      ),
      size: 315,
    },
    {
      id: 'interviewPeriod',
      header: '면접 진행 기간',
      cell: ({ row }) => (
        <div className="h-full flex items-center justify-evenly gap-[0.5rem] p-[1.5rem]">
          <p>{formatFullDate(row.original.interviewStart)}</p>
          <p>~</p>
          <p>{formatFullDate(row.original.interviewEnd)}</p>
        </div>
      ),
      size: 315,
    },
    {
      id: 'finalResultPeriod',
      header: '최종 결과 확인 기간',
      cell: ({ row }) => (
        <div className="h-full flex items-center justify-evenly gap-[0.5rem] p-[1.5rem]">
          <p>{formatFullDate(row.original.finalResultStart)}</p>
          <p>~</p>
          <p>{formatFullDate(row.original.finalResultEnd)}</p>
        </div>
      ),
      size: 315,
    },
    {
      id: 'delete',
      header: '',
      meta: {
        cellClassName: 'p-0',
      },
      cell: ({ row }) => {
        const item = row.original;
        const isDisabled = canDeleteGeneration(item.applicationStart);
        return (
          <div className="min-w-[6rem] h-full flex items-center justify-center">
            <button
              type="button"
              className="cursor-pointer hover:opacity-70 transition-opacity disabled:cursor-not-allowed"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(item.id);
              }}
              disabled={isDisabled}
            >
              <Trash width={22} className={isDisabled ? 'opacity-30' : ''} />
            </button>
          </div>
        );
      },
      size: 50,
    },
  ];
};
