import { useQueryClient } from '@tanstack/react-query';
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useNav } from '@/contexts/NavContext';
import type {
  ApplicationTableProps,
  EvaluationToggleType,
  StatusType,
} from '@/pages/Application/\btypes';
import {
  type ApplicantRowType,
  createColumns,
} from '@/pages/Application/components/ApplicationTableColumns';
import SelectedApplicantActions from '@/pages/Application/components/SelectedApplicantActions';
import SkeletonTable from '@/pages/Application/components/SkeletonTable';
import {
  ApplicantKeys,
  usePostApplicantPassStatus,
  usePostEvalution,
} from '@/pages/Application/hooks/queries';
import {
  convertPassInfoToStatus,
  convertStatusToPassInfo,
  goApplicationDetail,
  stopEventPropagationOnKey,
} from '@/pages/Application/utils';
import { scrollToLeft } from '@/utils/scroll';

const HEADER_BASE_STYLE =
  'p-[1rem] text-gray100 body_3_14_m bg-gray700 border-gray600';
const CELL_BASE_STYLE =
  'h-[6rem] text-center body_3_14_m bg-transparent border-b-[1px] border-gray700 align-middle';

const ApplicationTable = ({ data, isLoading }: ApplicationTableProps) => {
  const [passStatusList, setPassStatusList] = useState<Record<number, string>>(
    {}
  );
  const [checkedApplicantList, setCheckedApplicantList] = useState<number[]>(
    []
  );

  const tableRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  const { mutate } = usePostEvalution();
  const { mutate: postPassStatus } = usePostApplicantPassStatus();

  const { isOpen } = useNav();

  const checkedApplicantSet = useMemo(
    () => new Set(checkedApplicantList),
    [checkedApplicantList]
  );

  const isAllChecked =
    data.length > 0 && data.every((item) => checkedApplicantSet.has(item.id));

  const handleCheckAll = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.checked) {
        setCheckedApplicantList(data.map((item) => item.id));
      } else {
        setCheckedApplicantList([]);
      }
    },
    [data]
  );

  const handleCheckApplicant = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const id = Number(e.target.id);
      if (e.target.checked) {
        setCheckedApplicantList((prev) => [...prev, id]);
      } else {
        setCheckedApplicantList((prev) => prev.filter((x) => x !== id));
      }
    },
    []
  );

  const handleStatusChange = useCallback(
    (id: number, value: StatusType) => {
      setPassStatusList((prev) => ({ ...prev, [id]: value }));

      const { applicationPass, finalPass } = convertStatusToPassInfo(value);
      postPassStatus(
        { applicantId: id, applicationPass, finalPass },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ApplicantKeys.detail(id),
            });
          },
        }
      );
    },
    [postPassStatus, queryClient]
  );

  const handleEvaluation = useCallback(
    (
      applicantId: number,
      evaluationType: EvaluationToggleType,
      isChecked: boolean
    ) => {
      mutate(
        { applicantId, evaluationType, isChecked },
        {
          onSuccess: () => {
            queryClient.invalidateQueries({
              queryKey: ApplicantKeys.detail(applicantId),
            });
          },
        }
      );
    },
    [mutate, queryClient]
  );

  const columns = useMemo(
    () =>
      createColumns({
        checkedApplicantSet,
        passStatusList,
        onCheckAll: handleCheckAll,
        onCheckApplicant: handleCheckApplicant,
        onStatusChange: handleStatusChange,
        onEvaluation: handleEvaluation,
        convertPassInfoToStatus,
        isAllChecked,
      }),
    [
      checkedApplicantSet,
      passStatusList,
      handleCheckAll,
      handleCheckApplicant,
      handleStatusChange,
      handleEvaluation,
      isAllChecked,
    ]
  );

  const table = useReactTable({
    data: data as ApplicantRowType[],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    scrollToLeft(tableRef as React.RefObject<HTMLElement>);
  }, [data]);

  return (
    <div
      ref={tableRef}
      className={`w-full overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide pr-[12.4rem] pb-[5rem] transition-all duration-300 ${
        isOpen ? 'pl-[21.2rem]' : 'pl-[12.4rem]'
      }`}
    >
      <div className="w-[122.5rem] flex mb-[2.6rem] gap-[1.1rem] items-center">
        <span className="text-gray200 title_6_16_sb sticky left-0">
          총 {data.length}개
        </span>
        {checkedApplicantList.length > 0 && (
          <SelectedApplicantActions
            checkedApplicantList={checkedApplicantList}
          />
        )}
      </div>
      <table className="w-[122.5rem] table-fixed select-none">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header, index) => {
                const firstColumn = index === 0;
                const lastColumn = index === headerGroup.headers.length - 1;

                return (
                  <th
                    key={header.id}
                    style={{ width: header.getSize() }}
                    className={`${HEADER_BASE_STYLE} ${
                      firstColumn ? 'rounded-tl-[1rem] align-middle' : ''
                    } ${lastColumn ? 'rounded-tr-[1rem]' : ''} ${
                      !lastColumn ? 'border-r-[1px]' : ''
                    }`}
                    onClick={(e) => {
                      if (header.id === 'id') e.stopPropagation();
                    }}
                    onKeyDown={(e) => {
                      if (header.id === 'id') {
                        stopEventPropagationOnKey(e, ['Enter', ' ']);
                      }
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {data.length === 0 && !isLoading ? (
            <tr>
              <td colSpan={13} className={`${CELL_BASE_STYLE} text-gray200`}>
                확인할 수 있는 지원서가 없어요.
              </td>
            </tr>
          ) : isLoading ? (
            Array.from({ length: 10 }).map((_, index) => (
              <SkeletonTable key={index} />
            ))
          ) : (
            table.getRowModel().rows.map((row) => {
              return (
                <tr
                  key={row.id}
                  className="hover:bg-gray900 transition-colors duration-300 cursor-pointer"
                  tabIndex={0}
                  onClick={() => goApplicationDetail(row.original.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      goApplicationDetail(row.original.id);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell, cellIndex) => {
                    const isLastCell =
                      cellIndex === row.getVisibleCells().length - 1;
                    const isEvaluationStatus =
                      cell.column.id === 'evaluationStatus';
                    const shouldStopPropagation =
                      cell.column.id === 'id' || isEvaluationStatus;

                    return (
                      <td
                        key={cell.id}
                        className={`${CELL_BASE_STYLE} text-white ${
                          !isLastCell ? 'border-r-[1px]' : ''
                        } ${isEvaluationStatus ? 'p-[1rem] text-left' : ''}`}
                        onClick={(e) => {
                          if (shouldStopPropagation) {
                            e.stopPropagation();
                          }
                        }}
                        onKeyDown={(e) => {
                          if (shouldStopPropagation) {
                            stopEventPropagationOnKey(e, ['Enter', ' ']);
                          }
                        }}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationTable;
