import type { ApplicationTableProps } from '@/pages/Application/\btypes';
import ChipDropDown from '@/pages/Application/components/ChipDropdown';

import useDrag from '@/pages/Application/hooks/useDrag';
import { getEvaluationMessage } from '@/pages/Application/utils';
import { getDoNotReadMessage } from '@/pages/Application/utils';
import { CheckBox, Tag } from '@sopt-makers/ui';
import { useRef, useState } from 'react';

const HEADER_BASE_STYLE =
  'p-[1rem] text-gray100 body_3_14_m bg-gray700 border-gray600';
const CELL_BASE_STYLE =
  'h-[6rem] text-center body_3_14_m bg-transparent border-b-[1px] border-gray700 align-middle';
const TD_BASE_STYLE = 'h-full flex items-center justify-center';
const TD_CONTENT_STYLE = 'w-full text-center break-words p-[0.8rem]';

const ApplicationTable = ({ data }: ApplicationTableProps) => {
  const [passStatusList, setPassStatusList] = useState<Record<number, string>>(
    {},
  );

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const { onDragStart, onDragMove, onDragEnd, onDragLeave } =
    useDrag(scrollContainerRef);

  const handleStatusChange = (id: number, value: string) => {
    setPassStatusList((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div
      ref={scrollContainerRef}
      className="w-full overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide pr-[12.4rem] cursor-grab active:cursor-grabbing"
      onMouseDown={(e) => onDragStart(e)}
      onMouseMove={(e) => onDragMove(e)}
      onMouseUp={() => onDragEnd()}
      onMouseLeave={() => onDragLeave()}
    >
      <table className="w-[122.5rem] table-fixed select-none">
        <thead>
          <tr>
            <th
              className={`w-[11rem] rounded-tl-[1rem] border-r-[1px] border-gray600 ${HEADER_BASE_STYLE}`}
            >
              ID
            </th>
            <th
              className={`w-[11rem] border-r-[1px] border-gray600 ${HEADER_BASE_STYLE}`}
            >
              합격여부
            </th>
            <th
              className={`w-[14rem] border-r-[1px] border-gray600 ${HEADER_BASE_STYLE}`}
            >
              지원자 정보
            </th>
            <th
              className={`w-[11rem] border-r-[1px] border-gray600 ${HEADER_BASE_STYLE}`}
            >
              지원 파트
            </th>
            <th
              className={`w-[20rem] border-r-[1px] border-gray600 ${HEADER_BASE_STYLE}`}
            >
              읽지 마시오
            </th>
            <th
              className={`w-[20rem] border-r-[1px] border-gray600 ${HEADER_BASE_STYLE}`}
            >
              평가 상태
            </th>
            <th
              className={`w-[16.8rem] border-r-[1px] border-gray600 ${HEADER_BASE_STYLE}`}
            >
              제출시간
            </th>
            <th
              className={`w-[11rem] border-r-[1px] border-gray600 ${HEADER_BASE_STYLE}`}
            >
              최근 기수
            </th>
            <th
              className={`w-[14rem] border-r-[1px] border-gray600 ${HEADER_BASE_STYLE}`}
            >
              생년월일
            </th>
            <th
              className={`w-[14rem] border-r-[1px] border-gray600 ${HEADER_BASE_STYLE}`}
            >
              대학교
            </th>
            <th
              className={`w-[14rem] border-r-[1px] border-gray600 ${HEADER_BASE_STYLE}`}
            >
              학과
            </th>
            <th
              className={`w-[16.8rem] border-r-[1px] border-gray600 ${HEADER_BASE_STYLE}`}
            >
              이메일
            </th>
            <th
              className={`w-[14rem] rounded-tr-[1rem] border-gray600 ${HEADER_BASE_STYLE}`}
            >
              전화번호
            </th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={13} className={`${CELL_BASE_STYLE} text-gray200`}>
                확인할 수 있는 지원서가 없어요.
              </td>
            </tr>
          ) : (
            data.map((item) => {
              const doNotReadMessage = getDoNotReadMessage(item);
              const evaluationMessage = getEvaluationMessage(item);
              const currentStatus = passStatusList[item.id] || item.status;

              return (
                <tr
                  key={item.id}
                  className="hover:bg-gray900 transition-colors duration-300"
                >
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_CONTENT_STYLE}>{item.id}</div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_BASE_STYLE}>
                      <ChipDropDown
                        status={currentStatus}
                        onStatusChange={(value) =>
                          handleStatusChange(item.id, value)
                        }
                      />
                    </div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={`${TD_BASE_STYLE} gap-[1rem] py-[1rem]`}>
                      <img
                        src={item.profileImage}
                        alt="프로필"
                        className="w-[5.2rem] h-[7rem] object-cover rounded-[0.3rem]"
                      />
                      <span className="break-words">{item.name}</span>
                    </div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_CONTENT_STYLE}>{item.part}</div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px] p-[1rem] text-left`}
                  >
                    <div className="flex flex-col gap-[0.5rem] justify-start">
                      <div className="h-full flex items-center gap-[0.6rem]">
                        <CheckBox checked={item.isDoNotRead} />
                        <span>읽지 마시오</span>
                      </div>
                      {item.isDoNotRead && (
                        <div className="flex justify-start">
                          <span className="text-attention label_5_11_sb break-words overflow-hidden">
                            {doNotReadMessage}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px] p-[1rem] text-left`}
                  >
                    <div className="flex flex-col gap-[0.5rem] justify-start">
                      <div className="h-full flex items-center gap-[0.6rem]">
                        <CheckBox checked={item.evaluationStatus} />
                        <span>평가 완료</span>
                        <Tag shape="pill">
                          {
                            Object.values(item.evaluatedBy || {}).filter(
                              Boolean,
                            ).length
                          }
                        </Tag>
                      </div>
                      {item.evaluationStatus && (
                        <div className="flex justify-start">
                          <span className="text-gray200 label_5_11_sb break-words overflow-hidden">
                            {evaluationMessage}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_CONTENT_STYLE}>
                      {item.submissionTime}
                    </div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_CONTENT_STYLE}>
                      {item.recentGeneration}기
                    </div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_CONTENT_STYLE}>{item.birth}</div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_CONTENT_STYLE}>{item.university}</div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_CONTENT_STYLE}>{item.major}</div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_CONTENT_STYLE}>{item.email}</div>
                  </td>
                  <td className={`${CELL_BASE_STYLE} text-white`}>
                    <div className={TD_CONTENT_STYLE}>{item.phone}</div>
                  </td>
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
