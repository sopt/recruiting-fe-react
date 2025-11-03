import { CheckBox, Tag } from '@sopt-makers/ui';
import { useQueryClient } from '@tanstack/react-query';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import { AlertTriangle } from '@/assets/svg';
import Tooltip from '@/components/Tooltip';
import type {
  ApplicationTableProps,
  EvaluationToggleType,
  StatusType,
} from '@/pages/Application/\btypes';
import ChipDropDown from '@/pages/Application/components/ChipDropdown';
import SkeletonTable from '@/pages/Application/components/SkeletonTable';
import {
  ApplicantKeys,
  usePostApplicantPassStatus,
  usePostEvalution,
} from '@/pages/Application/hooks/queries';
import {
  convertPassInfoToStatus,
  convertStatusToPassInfo,
} from '@/pages/Application/utils';
import { ROUTES_CONFIG } from '@/routes/routeConfig';
import { getDoNotReadMessage, getEvaluationMessage } from '@/utils/message';
import { scrollToLeft } from '@/utils/scroll';

const HEADER_BASE_STYLE =
  'p-[1rem] text-gray100 body_3_14_m bg-gray700 border-gray600';
const CELL_BASE_STYLE =
  'h-[6rem] text-center body_3_14_m bg-transparent border-b-[1px] border-gray700 align-middle';
const TD_BASE_STYLE = 'h-full flex items-center cursor-pointer';
const TD_CONTENT_STYLE = 'w-full text-center break-words p-[0.8rem] ';

const ApplicationTable = ({ data, isLoading }: ApplicationTableProps) => {
  const [passStatusList, setPassStatusList] = useState<Record<number, string>>(
    {}
  );
  const tableRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  const { mutate } = usePostEvalution();
  const { mutate: postPassStatus } = usePostApplicantPassStatus();

  const goApplicationDetail = (applicantId: number) => {
    const path = ROUTES_CONFIG.applicationDetail.generatePath(applicantId);
    const url = `${window.location.origin}${
      path.startsWith('/') ? '' : '/'
    }${path}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const goApplicationDetailKeyDown = (
    e: React.KeyboardEvent,
    applicantId: number
  ) => {
    if (e.key === 'Enter') {
      goApplicationDetail(applicantId);
    }
  };

  const handleStatusChange = (id: number, value: StatusType) => {
    setPassStatusList((prev) => ({
      ...prev,
      [id]: value,
    }));

    const { applicationPass, finalPass } = convertStatusToPassInfo(value);
    postPassStatus(
      {
        applicantId: id,
        applicationPass,
        finalPass,
      },
      {
        onSuccess: () => {
          queryClient.invalidateQueries({
            queryKey: ApplicantKeys.detail(id),
          });
        },
      }
    );
  };

  const handleEvaluation = (
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
  };

  useEffect(() => {
    scrollToLeft(tableRef as React.RefObject<HTMLElement>);
  }, [data]);

  return (
    // biome-ignore lint/a11y/noStaticElementInteractions: 테이블 클릭시 디테일로 이동
    <div
      ref={tableRef}
      className="w-full overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide pr-[12.4rem] pb-[5rem] pl-[21.2rem]"
      onMouseDown={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('[data-dropdown]')) {
          return;
        }
      }}
    >
      <table className="w-[122.5rem] table-fixed select-none">
        <thead>
          <tr>
            <th
              className={`w-[11rem] rounded-tl-[1rem] border-r-[1px] ${HEADER_BASE_STYLE}`}
            >
              ID
            </th>
            <th className={`w-[11rem] border-r-[1px] ${HEADER_BASE_STYLE}`}>
              합격여부
            </th>
            <th className={`w-[14rem] border-r-[1px] ${HEADER_BASE_STYLE}`}>
              지원자 정보
            </th>
            <th className={`w-[11rem] border-r-[1px] ${HEADER_BASE_STYLE}`}>
              지원 파트
            </th>
            <th className={`w-[16.8rem] border-r-[1px] ${HEADER_BASE_STYLE}`}>
              읽지 마시오
            </th>
            <th className={`w-[16.8rem] border-r-[1px] ${HEADER_BASE_STYLE}`}>
              평가 상태
            </th>
            <th className={`w-[11rem] border-r-[1px] ${HEADER_BASE_STYLE}`}>
              최근 기수
            </th>
            <th className={`w-[14rem] border-r-[1px] ${HEADER_BASE_STYLE}`}>
              생년월일
            </th>
            <th className={`w-[14rem] border-r-[1px] ${HEADER_BASE_STYLE}`}>
              대학교
            </th>
            <th className={`w-[14rem] border-r-[1px]  ${HEADER_BASE_STYLE}`}>
              학과
            </th>
            <th className={`w-[16.8rem] border-r-[1px] ${HEADER_BASE_STYLE}`}>
              이메일
            </th>
            <th className={`w-[14rem] border-r-[1px] ${HEADER_BASE_STYLE}`}>
              전화번호
            </th>
            <th
              className={`w-[16.8rem] rounded-tr-[1rem] ${HEADER_BASE_STYLE}`}
            >
              제출시간
            </th>
          </tr>
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
            data.map((item) => {
              const doNotReadMessage = getDoNotReadMessage(
                item.dontReadInfo.checkedList
              );
              const evaluationMessage = getEvaluationMessage(
                item.evaluatedInfo.checkedList
              );
              const currentStatus =
                passStatusList[item.id] || convertPassInfoToStatus(item.status);

              return (
                <tr
                  key={item.id}
                  className="hover:bg-gray900 transition-colors duration-300 cursor-pointer"
                  tabIndex={0}
                  onClick={() => goApplicationDetail(item.id)}
                  onKeyDown={(e) => goApplicationDetailKeyDown(e, item.id)}
                >
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_CONTENT_STYLE}>{item.id}</div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={`${TD_BASE_STYLE} justify-center`}>
                      <ChipDropDown
                        status={currentStatus}
                        onStatusChange={(value) =>
                          handleStatusChange(item.id, value as StatusType)
                        }
                      />
                    </div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div
                      className={`${TD_BASE_STYLE} gap-[1rem] p-[1rem] justify-center`}
                    >
                      <img
                        src={item.pictureUrl}
                        alt="프로필"
                        className="w-[5.2rem] h-[7rem] object-cover rounded-[0.3rem]"
                      />
                      <span className="break-words w-[3.671rem]">
                        {item.name}
                      </span>
                    </div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_CONTENT_STYLE}>{item.part}</div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px] px-[1.2rem] py-[1rem] text-left`}
                  >
                    <div className="flex flex-col gap-[0.5rem] justify-start">
                      <div className="h-full flex items-center justify-between">
                        {/** biome-ignore lint/a11y/noStaticElementInteractions: 이벤트 전파 방지 */}
                        <div
                          className="flex items-center gap-[0.9rem] cursor-pointer z-10"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.stopPropagation();
                            }
                          }}
                        >
                          <CheckBox
                            id={`dont-read-${item.id}`}
                            checked={item.dontReadInfo.checkedByMe}
                            onChange={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              handleEvaluation(
                                item.id,
                                'DONT_READ',
                                !item.dontReadInfo.checkedByMe
                              );
                            }}
                          />
                          <label
                            htmlFor={`dont-read-${item.id}`}
                            className="flex items-center h-[3.2rem] cursor-pointer"
                          >
                            읽지 마시오
                          </label>
                        </div>

                        {item.dontReadInfo.checkedList.length > 0 && (
                          <div className="ml-auto">
                            <Tooltip.Root>
                              <Tooltip.Trigger>
                                <div className="bg-orangeAlpha200 rounded-[10rem] p-[0.8rem] z-[20]">
                                  <AlertTriangle width={16} height={16} />
                                </div>
                              </Tooltip.Trigger>
                              <Tooltip.Content className="!mt-[2.5rem]">
                                <span>{doNotReadMessage}</span>
                              </Tooltip.Content>
                            </Tooltip.Root>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px] p-[1rem] text-left`}
                  >
                    <div className="flex flex-col gap-[0.5rem] justify-start">
                      {/** biome-ignore lint/a11y/noStaticElementInteractions: 이벤트 전파 방지 */}
                      <div
                        className="h-full flex items-center gap-[0.6rem]"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.stopPropagation();
                          }
                        }}
                      >
                        <CheckBox
                          id={`evaluated-${item.id}`}
                          checked={item.evaluatedInfo.checkedByMe}
                          onChange={(e) => {
                            e.preventDefault();
                            handleEvaluation(
                              item.id,
                              'EVALUATION',
                              !item.evaluatedInfo.checkedByMe
                            );
                          }}
                        />
                        <label
                          htmlFor={`evaluated-${item.id}`}
                          className="flex items-center h-[3.2rem] cursor-pointer"
                        >
                          평가 완료
                        </label>
                        <div className="ml-[0.4rem]">
                          <Tooltip.Root>
                            <Tooltip.Trigger>
                              <Tag shape="pill">
                                {item.evaluatedInfo.checkedList.length}
                              </Tag>
                            </Tooltip.Trigger>
                            {item.evaluatedInfo.checkedList.length > 0 && (
                              <Tooltip.Content className="!mt-[1.3rem] !mr-[-0.5rem]">
                                <span>{evaluationMessage}</span>
                              </Tooltip.Content>
                            )}
                          </Tooltip.Root>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_CONTENT_STYLE}>
                      {item.mostRecentSeason === 0
                        ? '없음'
                        : item.mostRecentSeason}
                      기
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
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_CONTENT_STYLE}>{item.phone}</div>
                  </td>
                  <td className={`${CELL_BASE_STYLE} text-white`}>
                    <div className={TD_CONTENT_STYLE}>{item.submittedAt}</div>
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
