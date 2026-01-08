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

const formatDateRange = (start: string, end: string) => (
  <div className="h-full flex items-center justify-evenly gap-[0.5rem] p-[1.5rem]">
    <p>{formatFullDate(start)}</p>
    <p>~</p>
    <p>{formatFullDate(end)}</p>
  </div>
);

export const createColumns = (props: ColumnProps): ColumnDef<Season>[] => {
  const { onDelete } = props;

  return [
    {
      accessorKey: 'season',
      header: '기수',
      size: 110,
      meta: {
        align: 'center',
      },
    },
    {
      accessorKey: 'name',
      header: '이름',
      size: 140,
      meta: {
        align: 'center',
      },
    },
    {
      id: 'applicationPeriod',
      header: '서류 지원 기간',
      accessorFn: (row) => ({
        start: row.applicationStart,
        end: row.applicationEnd,
      }),
      cell: ({ getValue }) => {
        const { start, end } = getValue() as { start: string; end: string };
        return formatDateRange(start, end);
      },
      size: 315,
    },
    {
      id: 'applicationResultPeriod',
      header: '서류 결과 확인 기간',
      accessorFn: (row) => ({
        start: row.applicationResultStart,
        end: row.applicationResultEnd,
      }),
      cell: ({ getValue }) => {
        const { start, end } = getValue() as { start: string; end: string };
        return formatDateRange(start, end);
      },
      size: 315,
    },
    {
      id: 'interviewPeriod',
      header: '면접 진행 기간',
      accessorFn: (row) => ({
        start: row.interviewStart,
        end: row.interviewEnd,
      }),
      cell: ({ getValue }) => {
        const { start, end } = getValue() as { start: string; end: string };
        return formatDateRange(start, end);
      },
      size: 315,
    },
    {
      id: 'finalResultPeriod',
      header: '최종 결과 확인 기간',
      accessorFn: (row) => ({
        start: row.finalResultStart,
        end: row.finalResultEnd,
      }),
      cell: ({ getValue }) => {
        const { start, end } = getValue() as { start: string; end: string };
        return formatDateRange(start, end);
      },
      size: 315,
    },
    {
      id: 'delete',
      header: '',
      meta: {
        cellClassName: 'p-0',
        align: 'center',
      },
      cell: ({ row }) => {
        const isDisabled = canDeleteGeneration(row.original.applicationStart);
        return (
          <div className="min-w-[6rem] h-full flex items-center justify-center">
            <button
              type="button"
              className="cursor-pointer hover:opacity-70 transition-opacity disabled:cursor-not-allowed"
              onClick={(e) => {
                e.stopPropagation();
                onDelete(row.original.id);
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
