import { Button, CheckBox, Tag } from '@sopt-makers/ui';
import { useQueryClient } from '@tanstack/react-query';
import type React from 'react';
import { useEffect, useRef, useState } from 'react';
import Tooltip from '@/components/Tooltip';
import { useNav } from '@/contexts/NavContext';
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
import { getEvaluationMessage } from '@/utils/message';
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
  const [checkedApplicantList, setCheckedApplicantList] = useState<number[]>(
    []
  );

  const tableRef = useRef<HTMLDivElement>(null);

  const queryClient = useQueryClient();

  const { mutate } = usePostEvalution();
  const { mutate: postPassStatus } = usePostApplicantPassStatus();

  const { isOpen } = useNav();

  const goApplicationDetail = (applicantId: number) => {
    const path = ROUTES_CONFIG.applicationDetail.generatePath(applicantId);
    const url = `${window.location.origin}${
      path.startsWith('/') ? '' : '/'
    }${path}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const isAllChecked =
    data.length > 0 &&
    data.every((item) => checkedApplicantList.includes(item.id));

  const handleCheckAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      const checkedList: number[] = [];

      Object.entries(data).map((item, idx) => {
        checkedList[idx] = item[1].id;
      });

      setCheckedApplicantList(checkedList);
    } else {
      setCheckedApplicantList([]);
    }
  };

  const handleCheckApplicant = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setCheckedApplicantList((prev) => [...prev, Number(e.target.id)]);
    } else {
      setCheckedApplicantList((prev) =>
        prev.filter((id) => id !== Number(e.target.id))
      );
    }
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
      className={`w-full overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide pr-[12.4rem] pb-[5rem] transition-all duration-300 ${
        isOpen ? 'pl-[21.2rem]' : 'pl-[12.4rem]'
      }`}
      onMouseDown={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('[data-dropdown]')) {
          return;
        }
      }}
    >
      <div className="w-[122.5rem] flex mb-[2.6rem] gap-[1.1rem] items-center">
        <span className="text-gray200 title_6_16_sb">총 {data.length}개</span>
        {checkedApplicantList.length > 0 && (
          <>
            <span className="text-gray200 title_6_16_sb">|</span>
            <div className="flex gap-[1.3rem] items-center">
              <span className="text-gray200 title_6_16_sb ml-[0.2rem]">
                {checkedApplicantList.length}건 선택
              </span>
              <Button
                theme="black"
                size="sm"
                onClick={() => {
                  checkedApplicantList.forEach((id) => {
                    goApplicationDetail(id);
                  });
                }}
                disabled={checkedApplicantList.length === 0}
              >
                새 창 열기
              </Button>
            </div>
          </>
        )}
      </div>
      <table className="w-[122.5rem] table-fixed select-none">
        <thead>
          <tr>
            <th
              className={`w-[7.8rem] rounded-tl-[1rem] border-r-[1px] align-middle ${HEADER_BASE_STYLE}`}
              onClick={(e) => e.stopPropagation()}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.stopPropagation();
                }
              }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <CheckBox
                  checked={isAllChecked}
                  onChange={(e) => {
                    e.stopPropagation();
                    handleCheckAll(e);
                  }}
                />
              </div>
            </th>
            <th className={`w-[14rem] border-r-[1px] ${HEADER_BASE_STYLE}`}>
              지원자 정보
            </th>
            <th className={`w-[11rem] border-r-[1px] ${HEADER_BASE_STYLE}`}>
              합격여부
            </th>
            <th className={`w-[11rem] border-r-[1px] ${HEADER_BASE_STYLE}`}>
              지원 파트
            </th>
            <th className={`w-[16.8rem] border-r-[1px] ${HEADER_BASE_STYLE}`}>
              평가 상태
            </th>
            <th className={`w-[16.8rem] border-r-[1px] ${HEADER_BASE_STYLE}`}>
              제출시간
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
            <th className={`w-[14rem] rounded-tr-[1rem] ${HEADER_BASE_STYLE}`}>
              전화번호
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
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.stopPropagation();
                      }
                    }}
                  >
                    <div className={`${TD_BASE_STYLE} justify-center`}>
                      <CheckBox
                        id={String(item.id)}
                        checked={checkedApplicantList.includes(item.id)}
                        onChange={(e) => {
                          e.stopPropagation();
                          handleCheckApplicant(e);
                        }}
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
                    <div className={TD_CONTENT_STYLE}>{item.part}</div>
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
                  <td className={`${CELL_BASE_STYLE} text-white`}>
                    <div className={TD_CONTENT_STYLE}>{item.submittedAt}</div>
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
