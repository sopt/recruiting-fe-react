import type { Row, Table as TanStackTable } from '@tanstack/react-table';

export interface TableProps<TData> {
  table: TanStackTable<TData>;

  /** 로딩 상태 */
  isLoading?: boolean;
  skeletonComponent?: React.ReactNode;

  /** 빈 상태일 때 */
  emptyMessage?: string;
  emptyComponent?: React.ReactNode;

  /** 헤더/셀 기본 스타일 클래스명 */
  headerBaseClassName?: string;
  cellBaseClassName?: string;

  onRowClick?: (row: Row<TData>) => void;
  onRowKeyDown?: (e: React.KeyboardEvent, row: Row<TData>) => void;

  /** 테이블 상단에 표시할 추가 컨텐츠 */
  headerContent?: React.ReactNode;

  onCellClick?: (
    columnId: string,
    e: React.MouseEvent,
    row: Row<TData>
  ) => void;
  onCellKeyDown?: (
    columnId: string,
    e: React.KeyboardEvent,
    row: Row<TData>
  ) => void;
}
