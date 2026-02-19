import { useQueryClient } from '@tanstack/react-query';
import { getCoreRowModel, useReactTable } from '@tanstack/react-table';
import type React from 'react';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Table } from '@/components/Table';
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

const ApplicationTable = ({ data: { data = [], meta }, isLoading }: ApplicationTableProps) => {
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

  useEffect(() => {
    scrollToLeft(tableRef as React.RefObject<HTMLElement>);
  }, [data]);

  const handleCellClick = useCallback(
    (columnId: string, e: React.MouseEvent) => {
      const shouldStopPropagation =
        columnId === 'id' || columnId === 'evaluationStatus';
      if (shouldStopPropagation) {
        e.stopPropagation();
      }
    },
    []
  );

  const handleCellKeyDown = useCallback(
    (columnId: string, e: React.KeyboardEvent) => {
      const shouldStopPropagation =
        columnId === 'id' || columnId === 'evaluationStatus';
      if (shouldStopPropagation) {
        stopEventPropagationOnKey(e, ['Enter', ' ']);
      }
    },
    []
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
    getRowId: (row) => String(row.id),
  });

  const headerContent = (
    <>
      <span className="text-gray200 title_6_16_sb sticky left-0">
        총 {meta?.total}개
      </span>
      {checkedApplicantList.length > 0 && (
        <SelectedApplicantActions checkedApplicantList={checkedApplicantList} />
      )}
    </>
  );

  const skeletonComponent = Array.from({ length: 10 }).map((_, index) => (
    <SkeletonTable key={index} />
  ));

  return (
    <div
      ref={tableRef}
      className={`w-full overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide pr-[12.4rem] pb-[5rem] transition-all duration-300 ${
        isOpen ? 'pl-[21.2rem]' : 'pl-[12.4rem]'
      }`}
    >
      <Table<ApplicantRowType>
        table={table}
        isLoading={isLoading}
        emptyMessage="확인할 수 있는 지원서가 없어요."
        skeletonComponent={skeletonComponent}
        onRowClick={(row) => goApplicationDetail(row.original.id)}
        onCellClick={handleCellClick}
        onCellKeyDown={handleCellKeyDown}
        headerContent={headerContent}
      />
    </div>
  );
};

export default ApplicationTable;
