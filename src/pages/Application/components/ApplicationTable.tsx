import { AlertTriangle } from '@/assets/svg';
import Tooltip from '@/components/Tooltip';
import type {
  EvaluationToggleType,
  StatusType,
} from '@/pages/Application/\btypes';
import type { ApplicationTableProps } from '@/pages/Application/\btypes';
import ChipDropDown from '@/pages/Application/components/ChipDropdown';
import {
  usePostApplicantPassStatus,
  usePostEvalution,
} from '@/pages/Application/hooks/queries';
import useDrag from '@/pages/Application/hooks/useDrag';
import {
  convertPassInfoToStatus,
  convertStatusToPassInfo,
  getEvaluationMessage,
  getPartName,
} from '@/pages/Application/utils';
import { getDoNotReadMessage } from '@/pages/Application/utils';
import { ROUTES_CONFIG } from '@/routes/routeConfig';
import { CheckBox, Tag } from '@sopt-makers/ui';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  const { onDragStart, onDragMove, onDragEnd, onDragLeave } =
    useDrag(scrollContainerRef);

  const { mutate } = usePostEvalution();
  const { mutate: postPassStatus } = usePostApplicantPassStatus();

  const goApplicaiontDetail = (applicantId: number) => {
    navigate(ROUTES_CONFIG.applicationDetail.generatePath(applicantId));
  };

  const handleStatusChange = (id: number, value: StatusType) => {
    setPassStatusList((prev) => ({
      ...prev,
      [id]: value,
    }));

    const { applicationPass, finalPass } = convertStatusToPassInfo(value);

    postPassStatus({
      applicantId: id,
      applicationPass,
      finalPass,
    });
  };

  const handleEvaluation = (
    applicantId: number,
    evaluationType: EvaluationToggleType,
    isChecked: boolean,
  ) => {
    mutate({ applicantId, evaluationType, isChecked });
  };

  return (
    <div
      ref={scrollContainerRef}
      className="w-full overflow-x-auto overflow-y-hidden scroll-smooth scrollbar-hide pr-[12.4rem] cursor-grab active:cursor-grabbing"
      onMouseDown={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest('[data-dropdown]')) {
          return;
        }
        onDragStart(e);
      }}
      onMouseMove={(e) => onDragMove(e)}
      onMouseUp={() => onDragEnd()}
      onMouseLeave={() => onDragLeave()}
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
              const currentStatus =
                passStatusList[item.id] || convertPassInfoToStatus(item.status);

              return (
                <tr
                  key={item.id}
                  className="hover:bg-gray900 transition-colors duration-300"
                  onClick={() => goApplicaiontDetail(item.id)}
                  onKeyDown={() => goApplicaiontDetail(item.id)}
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
                          handleStatusChange(item.id, value as StatusType)
                        }
                      />
                    </div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={`${TD_BASE_STYLE} gap-[1rem] py-[1rem]`}>
                      <img
                        src={item.pictureUrl}
                        alt="프로필"
                        className="w-[5.2rem] h-[7rem] object-cover rounded-[0.3rem]"
                      />
                      <span className="break-words">{item.name}</span>
                    </div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_CONTENT_STYLE}>
                      {getPartName(item.part)}
                    </div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px] px-[1.2rem] py-[1rem] text-left`}
                  >
                    <div className="flex flex-col gap-[0.5rem] justify-start">
                      <div className="h-full flex items-center justify-between">
                        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                        <div
                          className="flex items-center gap-[0.9rem] cursor-pointer z-10"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                        >
                          <CheckBox
                            checked={item.dontReadInfo.checkedByMe}
                            onClick={(e) => {
                              e.stopPropagation();
                              e.preventDefault();
                              handleEvaluation(
                                item.id,
                                'DONT_READ',
                                !item.dontReadInfo.checkedByMe,
                              );
                            }}
                          />
                          <span>읽지 마시오</span>
                        </div>

                        {item.dontReadInfo.checkedList.length > 0 && (
                          <Tooltip.Root>
                            <Tooltip.Trigger>
                              <div className="bg-orangeAlpha200 rounded-[10rem] p-[0.8rem]">
                                <AlertTriangle width={16} height={16} />
                              </div>
                            </Tooltip.Trigger>
                            <Tooltip.Content className="!mt-[2.5rem]">
                              <span>{doNotReadMessage}</span>
                            </Tooltip.Content>
                          </Tooltip.Root>
                        )}
                      </div>
                    </div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px] p-[1rem] text-left`}
                  >
                    <div className="flex flex-col gap-[0.5rem] justify-start">
                      {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
                      <div
                        className="h-full flex items-center gap-[0.6rem]"
                        onClick={(e) => {
                          e.stopPropagation();
                        }}
                      >
                        <CheckBox
                          checked={item.evaluatedInfo.checkedByMe}
                          onClick={(e) => {
                            e.preventDefault();
                            handleEvaluation(
                              item.id,
                              'EVALUATION',
                              !item.evaluatedInfo.checkedByMe,
                            );
                          }}
                        />
                        <span>평가 완료</span>
                        <Tooltip.Root>
                          <Tooltip.Trigger>
                            <Tag shape="pill">
                              {item.evaluatedInfo.checkedList.length}
                            </Tag>
                          </Tooltip.Trigger>
                          {item.evaluatedInfo.checkedList.length > 0 && (
                            <Tooltip.Content className="!mt-[1.3rem]">
                              <span>{evaluationMessage}</span>
                            </Tooltip.Content>
                          )}
                        </Tooltip.Root>
                      </div>
                    </div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_CONTENT_STYLE}>
                      {item.mostRecentSeason}기
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
