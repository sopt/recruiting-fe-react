import Callout from '@/components/Callout';

export const APPLY_INFO = [
  '지원서 작성 전에 SOPT 커리큘럼을 꼭 숙지하고 지원해 주시기 바랍니다.',
  '0월 00일 0요일 OT(오프라인 에정)에 불참 시 지원이 불가하오니 자세히 확인 바랍니다.',
  '한 번 제출된 지원서는 수정이 불가하니 신중히 작성하신 후 제출 부탁드립니다.',
  '최종 제출하지 않은 임시저장 지원서는 미제출로 간주하오니 반드시 최종 제출하시길 바랍니다.',
  '지원 마감 시간이 입박하면 지원자가 몰려 서버가 불안정할 수 있으므로 가급적 여유롭게 제출하는 것을 권장드립니다.',
];

export const APPLY_INFO_CALLOUT = [
  '마감 시간 이후에는 지원 제출을 받지 않습니다.',
  '제출하신 서류와 포트폴리오는 반환하지 않습니다.',
  '서버 오류를 대비해 지원서를 백업해 두시길 바랍니다.',
];

const APPLY_DATE = [
  {
    label: '지원 기간',
    text: '00.00(월) 오전 00:00 - 00.00(금) 오후 00:00',
  },
  {
    label: '서류 발표',
    text: '00.00(월)',
  },
  {
    label: '면접 평가',
    text: '00.00(월) 오전 00:00 - 00.00(금) (오프라인 면접)',
  },
  {
    label: '최종 발표',
    text: '00.00(월)',
  },
];

const DATE_ITEMS = 'flex gap-[1.2rem] justify-start items-center';
const DATE_LABEL =
  'py-[0.6rem] px-[1.3rem] rounded-[0.8rem] title_5_18_sb bg-gray20 text-gray300';
const DATE_TEXT = 'body_1_18_m text-gray950';

const ApplyInfo = () => {
  return (
    <section className="flex flex-col pt-[3rem] gap-[5rem] justify-center items-center">
      <ul className="flex flex-col gap-[1.6rem] max-w-[71.1rem] list-disc list-outside [&>li]:marker:text-[1rem]">
        {APPLY_INFO.map((info, index) => (
          <li key={index} className="body_1_18_m text-gray-300">
            {info}
          </li>
        ))}
      </ul>

      <Callout className="min-w-[72rem]">
        <div className="flex flex-col">
          {APPLY_INFO_CALLOUT.map((info, index) => (
            <p key={index} className="title_5_18_sb text-gray-950">
              {info}
            </p>
          ))}
        </div>
      </Callout>
      <ol className="flex flex-col w-[72rem] items-baseline gap-[0.8rem]">
        {APPLY_DATE.map((date, index) => (
          <li key={index} className={DATE_ITEMS}>
            <span className={DATE_LABEL}>{APPLY_DATE[0].label}</span>
            <span className={DATE_TEXT}>{date.text}</span>
          </li>
        ))}
      </ol>
    </section>
  );
};

export default ApplyInfo;
