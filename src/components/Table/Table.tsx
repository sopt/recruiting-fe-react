import type { Row } from '@tanstack/react-table';
import { flexRender } from '@tanstack/react-table';
import type React from 'react';
import type { TableProps } from '@/components/Table/types';

const DEFAULT_HEADER_BASE_STYLE =
  'p-[1rem] text-gray100 body_3_14_m bg-gray700 border-gray600';
const DEFAULT_CELL_BASE_STYLE =
  'h-[6rem] text-center body_3_14_m bg-transparent border-b-[1px] border-gray700 align-middle';
const DEFAULT_TABLE_WIDTH = 'w-full';
const DEFAULT_TABLE_CLASS_NAME = 'w-full table-fixed select-none';

function Table<TData>({
  table,
  isLoading = false,
  emptyMessage = '데이터가 없습니다.',
  emptyComponent,
  skeletonComponent,
  headerBaseClassName = DEFAULT_HEADER_BASE_STYLE,
  cellBaseClassName = DEFAULT_CELL_BASE_STYLE,
  onRowClick,
  onRowKeyDown,
  headerContent,
  onCellClick,
  onCellKeyDown,
}: TableProps<TData>) {
  const handleRowClick = (row: Row<TData>) => {
    if (onRowClick) {
      onRowClick(row);
    }
  };

  const handleRowKeyDown = (e: React.KeyboardEvent, row: Row<TData>) => {
    if (onRowKeyDown) {
      onRowKeyDown(e, row);
    } else if (e.key === 'Enter' && onRowClick) {
      onRowClick(row);
    }
  };

  const rowModel = table.getRowModel();
  const isEmpty = rowModel.rows.length === 0 && !isLoading;
  const colSpan = table.getAllColumns().length;

  return (
    <div>
      {headerContent && (
        <div className={`flex mb-[2.6rem] gap-[1.1rem] items-center`}>
          {headerContent}
        </div>
      )}
      <div>
        <table className={`${DEFAULT_TABLE_CLASS_NAME} ${DEFAULT_TABLE_WIDTH}`}>
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
                      className={`${headerBaseClassName} ${
                        firstColumn ? 'rounded-tl-[1rem] align-middle' : ''
                      } ${lastColumn ? 'rounded-tr-[1rem]' : ''} ${
                        !lastColumn ? 'border-r-[1px]' : ''
                      }`}
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
            {isEmpty ? (
              <tr>
                <td
                  colSpan={colSpan}
                  className={`${cellBaseClassName} text-gray200`}
                >
                  {emptyComponent || emptyMessage}
                </td>
              </tr>
            ) : isLoading && skeletonComponent ? (
              <>{skeletonComponent}</>
            ) : (
              rowModel.rows.map((row) => {
                return (
                  <tr
                    key={row.id}
                    className="hover:bg-gray900 transition-colors duration-300 cursor-pointer"
                    tabIndex={0}
                    onClick={() => handleRowClick(row)}
                    onKeyDown={(e) => handleRowKeyDown(e, row)}
                  >
                    {row.getVisibleCells().map((cell, cellIndex) => {
                      const isLastCell =
                        cellIndex === row.getVisibleCells().length - 1;
                      const columnMeta = cell.column.columnDef.meta as
                        | {
                            cellClassName?: string;
                            align?: 'left' | 'center' | 'right';
                          }
                        | undefined;
                      const customCellClassName =
                        columnMeta?.cellClassName || '';
                      const align = columnMeta?.align || 'center';
                      const alignClass =
                        align === 'left'
                          ? 'text-left'
                          : align === 'right'
                          ? 'text-right'
                          : 'text-center';

                      return (
                        <td
                          key={cell.id}
                          className={`${cellBaseClassName} text-white ${alignClass} ${
                            !isLastCell ? 'border-r-[1px]' : ''
                          } ${customCellClassName}`}
                          onClick={
                            onCellClick
                              ? (e) => onCellClick(cell.column.id, e, row)
                              : undefined
                          }
                          onKeyDown={
                            onCellKeyDown
                              ? (e) => onCellKeyDown(cell.column.id, e, row)
                              : undefined
                          }
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
    </div>
  );
}

export default Table;
