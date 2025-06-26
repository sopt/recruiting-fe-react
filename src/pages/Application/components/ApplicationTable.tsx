import profile from '@/assets/image/profile.jpg';
import Chip from '@/components/Chip';
import { CheckBox } from '@sopt-makers/ui';

interface ApplicationTableProps {
  data: {
    id: number;
    status: '최종 합격' | '불합격' | '서류 합격' | '확인 전';
    profileImage: string;
    name: string;
    part: '기획' | '디자인' | '서버' | 'iOS' | '안드로이드' | '웹';
    isDoNotRead: boolean;
    evaluationStatus: boolean;
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

const STATUS_COLOR = {
  '서류 합격': 'text-information bg-greenAlpha100 border-greenAlpha400',
  불합격: 'text-error bg-redAlpha100 border-redAlpha600',
  '확인 전': 'text-gray100 bg-grayAlpha100 border-gray400',
  '최종 합격': 'text-success bg-blueAlpha100 border-blueAlpha600',
};

const ApplicationTable = ({ data }: ApplicationTableProps) => {
  const dummyData = [
    {
      id: 1,
      status: '서류 합격' as const,
      profileImage: profile,
      name: '김철수',
      part: '웹' as const,
      isDoNotRead: false,
      evaluationStatus: true,
      submissionTime: '2024-01-15 14:30:00',
      recentGeneration: 33,
      birth: '2000-03-15',
      university: '서울대학교',
      major: '컴퓨터공학과',
      email: 'kim.chulsoo@example.com',
      phone: '010-1234-5678',
    },
  ];

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
          {dummyData.length === 0 ? (
            <tr>
              <td colSpan={13} className={`${CELL_BASE_STYLE} text-gray200`}>
                확인할 수 있는 지원서가 없어요.
              </td>
            </tr>
          ) : (
            dummyData.map((item, index) => (
              <tr
                key={index}
                className="hover:bg-gray900 transition-colors duration-300"
              >
                <td className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}>
                  <div className="h-full flex items-center justify-center">
                    {item.id}
                  </div>
                </td>
                <td className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}>
                  <div className="h-full flex items-center justify-center">
                    <Chip className={`${STATUS_COLOR[item.status]}`}>
                      {item.status}
                    </Chip>
                  </div>
                </td>
                <td className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}>
                  <div className="h-full flex items-center justify-center gap-[0.5rem] py-[1rem] ">
                    <img
                      src={item.profileImage}
                      alt="프로필"
                      className="w-[5.2rem] h-[7rem] object-cover rounded-[0.3rem]"
                    />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}>
                  <div className="h-full flex items-center justify-center">
                    {item.part}
                  </div>
                </td>
                <td className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}>
                  <div className="h-full flex items-center justify-center gap-[0.6rem]">
                    <CheckBox checked={item.isDoNotRead} />
                    <span>읽지 마시오</span>
                  </div>
                </td>
                <td className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}>
                  <div className="h-full flex items-center justify-center gap-[0.6rem]">
                    <CheckBox checked={item.evaluationStatus} />
                    <span>평가 완료</span>
                  </div>
                </td>
                <td className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}>
                  <div className="h-full flex items-center justify-center">
                    {item.submissionTime}
                  </div>
                </td>
                <td className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}>
                  <div className="h-full flex items-center justify-center">
                    {item.recentGeneration}기
                  </div>
                </td>
                <td className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}>
                  <div className="h-full flex items-center justify-center">
                    {item.birth}
                  </div>
                </td>
                <td className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}>
                  <div className="h-full flex items-center justify-center">
                    {item.university}
                  </div>
                </td>
                <td className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}>
                  <div className="h-full flex items-center justify-center">
                    {item.major}
                  </div>
                </td>
                <td className={`${CELL_BASE_STYLE} text-white border-r-[1px]`}>
                  <div className="h-full flex items-center justify-center">
                    {item.email}
                  </div>
                </td>
                <td className={`${CELL_BASE_STYLE} text-white`}>
                  <div className="h-full flex items-center justify-center">
                    {item.phone}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationTable;
