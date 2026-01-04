import { CheckBox, Tag } from '@sopt-makers/ui';
import type { ColumnDef } from '@tanstack/react-table';
import type React from 'react';
import Tooltip from '@/components/Tooltip';
import type {
  EvaluationToggleType,
  PartType,
  SoptPartType,
  StatusType,
} from '@/pages/Application/\btypes';
import ChipDropDown from '@/pages/Application/components/ChipDropdown';
import { getEvaluationMessage } from '@/utils/message';

export type ApplicantRowType = {
  id: number;
  status: StatusType;
  name: string;
  pictureUrl: string;
  part: PartType | SoptPartType;
  evaluatedInfo: {
    checkedByMe: boolean;
    checkedList: string[];
  };
  submittedAt: string;
  generation: number;
  birth: string;
  university: string;
  major: string;
  mostRecentSeason: number;
  email: string;
  phone: string;
};

type ColumnProps = {
  checkedApplicantSet: Set<number>;
  passStatusList: Record<number, string>;
  onCheckAll: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCheckApplicant: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onStatusChange: (id: number, value: StatusType) => void;
  onEvaluation: (
    applicantId: number,
    evaluationType: EvaluationToggleType,
    isChecked: boolean
  ) => void;
  convertPassInfoToStatus: (status: StatusType) => string;
  isAllChecked: boolean;
};

const TD_BASE_STYLE = 'h-full flex items-center cursor-pointer';
const TD_CONTENT_STYLE = 'w-full text-center break-words p-[0.8rem] ';

export const createColumns = (
  props: ColumnProps
): ColumnDef<ApplicantRowType>[] => {
  const {
    checkedApplicantSet,
    passStatusList,
    onCheckAll,
    onCheckApplicant,
    onStatusChange,
    onEvaluation,
    convertPassInfoToStatus,
    isAllChecked,
  } = props;

  return [
    {
      id: 'id',
      header: () => (
        <div className="w-full h-full flex items-center justify-center">
          <CheckBox
            checked={isAllChecked}
            onChange={(e) => {
              e.stopPropagation();
              onCheckAll(e);
            }}
          />
        </div>
      ),
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className={`${TD_BASE_STYLE} justify-center`}>
            <CheckBox
              id={String(item.id)}
              checked={checkedApplicantSet.has(item.id)}
              onChange={(e) => {
                e.stopPropagation();
                onCheckApplicant(e);
              }}
            />
          </div>
        );
      },
      size: 78,
    },
    {
      id: 'profile',
      header: '지원자 정보',
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div
            className={`${TD_BASE_STYLE} gap-[1rem] p-[1rem] justify-center`}
          >
            <img
              src={item.pictureUrl}
              alt="프로필"
              className="w-[5.2rem] h-[7rem] object-cover rounded-[0.3rem]"
            />
            <span className="break-words w-[3.671rem]">{item.name}</span>
          </div>
        );
      },
      size: 140,
    },
    {
      id: 'passStatus',
      header: '합격여부',
      cell: ({ row }) => {
        const item = row.original;
        const currentStatus =
          passStatusList[item.id] || convertPassInfoToStatus(item.status);
        return (
          <div className={`${TD_BASE_STYLE} justify-center`}>
            <ChipDropDown
              status={currentStatus}
              onStatusChange={(value) =>
                onStatusChange(item.id, value as StatusType)
              }
            />
          </div>
        );
      },
      size: 110,
    },
    {
      id: 'part',
      header: '지원 파트',
      cell: ({ row }) => {
        const item = row.original;
        return <div className={TD_CONTENT_STYLE}>{item.part}</div>;
      },
      size: 110,
    },
    {
      id: 'evaluationStatus',
      header: '평가 상태',
      cell: ({ row }) => {
        const item = row.original;
        const evaluationMessage = getEvaluationMessage(
          item.evaluatedInfo.checkedList
        );

        return (
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
                  e.stopPropagation();
                  onEvaluation(
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
        );
      },
      size: 168,
    },

    {
      id: 'submittedAt',
      header: '제출시간',
      cell: ({ row }) => (
        <div className={TD_CONTENT_STYLE}>{row.original.submittedAt}</div>
      ),
      size: 168,
    },
    {
      id: 'mostRecentSeason',
      header: '최근 기수',
      cell: ({ row }) => (
        <div className={TD_CONTENT_STYLE}>
          {row.original.mostRecentSeason === 0
            ? '없음'
            : row.original.mostRecentSeason}
          기
        </div>
      ),
      size: 110,
    },
    {
      id: 'birth',
      header: '생년월일',
      cell: ({ row }) => (
        <div className={TD_CONTENT_STYLE}>{row.original.birth}</div>
      ),
      size: 140,
    },
    {
      id: 'university',
      header: '대학교',
      cell: ({ row }) => (
        <div className={TD_CONTENT_STYLE}>{row.original.university}</div>
      ),
      size: 140,
    },
    {
      id: 'major',
      header: '학과',
      cell: ({ row }) => (
        <div className={TD_CONTENT_STYLE}>{row.original.major}</div>
      ),
      size: 140,
    },
    {
      id: 'email',
      header: '이메일',
      cell: ({ row }) => (
        <div className={TD_CONTENT_STYLE}>{row.original.email}</div>
      ),
      size: 168,
    },
    {
      id: 'phone',
      header: '전화번호',
      cell: ({ row }) => (
        <div className={TD_CONTENT_STYLE}>{row.original.phone}</div>
      ),
      size: 140,
    },
  ];
};
