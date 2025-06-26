import Chip from '@/components/Chip';
import type { SOPTPart, StatusType } from '@/pages/Application/\btypes';
import { CheckBox } from '@sopt-makers/ui';

interface ApplicationTableProps {
  data: {
    id: number;
    status: StatusType;
    profileImage: string;
    name: string;
    part: SOPTPart;
    isDoNotRead: boolean;
    doNotReadBy?: {
      기획?: boolean;
      디자인?: boolean;
      서버?: boolean;
      iOS?: boolean;
      안드로이드?: boolean;
      웹?: boolean;
      회장?: boolean;
    };
    evaluationStatus: boolean;
    evaluatedBy?: {
      기획?: boolean;
      디자인?: boolean;
      서버?: boolean;
      iOS?: boolean;
      안드로이드?: boolean;
      웹?: boolean;
      회장?: boolean;
    };
    submissionTime: string;
    recentGeneration: number;
    birth: string;
    university: string;
    major: string;
    email: string;
    phone: string;
  }[];
}

const HEADER_BASE_STYLE =
  'p-[1rem] text-gray100 body_3_14_m bg-gray700 border-gray600';
const CELL_BASE_STYLE =
  'h-[6rem] text-center body_3_14_m bg-transparent border-b-[1px] border-gray700 align-middle';
const TD_BASE_STYLE = 'h-full flex items-center justify-center';

const STATUS_COLOR = {
  '서류 합격': 'text-information bg-greenAlpha100 border-greenAlpha400',
  불합격: 'text-error bg-redAlpha100 border-redAlpha600',
  '확인 전': 'text-gray100 bg-grayAlpha100 border-gray400',
  '최종 합격': 'text-success bg-blueAlpha100 border-blueAlpha600',
};

const ApplicationTable = ({ data }: ApplicationTableProps) => {
  const getDoNotReadMessage = (item: ApplicationTableProps['data'][0]) => {
    if (!item.doNotReadBy) return null;

    const selectedParts = Object.keys(item.doNotReadBy).filter(
      (key) => item.doNotReadBy![key as keyof typeof item.doNotReadBy],
    );

    if (selectedParts.length === 0) return null;

    return `${selectedParts.join(', ')}이(가) 읽지 말라고 선택했어요.`;
  };

  const getEvaluationMessage = (item: ApplicationTableProps['data'][0]) => {
    if (!item.evaluatedBy) return null;

    const selectedParts = Object.keys(item.evaluatedBy).filter(
      (key) => item.evaluatedBy![key as keyof typeof item.evaluatedBy],
    );

    if (selectedParts.length === 0) return null;

    return `${selectedParts.join(', ')}이(가) 평가를 완료했어요.`;
  };

  return (
    <div className="w-full overflow-x-auto scroll-smooth scrollbar-hide pr-[12.4rem]">
      <table className="w-[122.5rem] table-fixed">
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
            data.map((item, index) => {
              const doNotReadMessage = getDoNotReadMessage(item);
              const evaluationMessage = getEvaluationMessage(item);

              return (
                <tr
                  key={index}
                  className="hover:bg-gray900 transition-colors duration-300"
                >
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_BASE_STYLE}>{item.id}</div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_BASE_STYLE}>
                      <Chip className={`${STATUS_COLOR[item.status]}`}>
                        {item.status}
                      </Chip>
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
                      <span>{item.name}</span>
                    </div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_BASE_STYLE}>{item.part}</div>
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
                          <span className="text-attention label_5_11_sb">
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
                      </div>
                      {item.evaluationStatus && (
                        <div className="flex justify-start">
                          <span className="text-gray200 label_5_11_sb">
                            {evaluationMessage}
                          </span>
                        </div>
                      )}
                    </div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_BASE_STYLE}>{item.submissionTime}</div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_BASE_STYLE}>
                      {item.recentGeneration}기
                    </div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_BASE_STYLE}>{item.birth}</div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_BASE_STYLE}>{item.university}</div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_BASE_STYLE}>{item.major}</div>
                  </td>
                  <td
                    className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}
                  >
                    <div className={TD_BASE_STYLE}>{item.email}</div>
                  </td>
                  <td className={`${CELL_BASE_STYLE} text-white`}>
                    <div className={TD_BASE_STYLE}>{item.phone}</div>
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
