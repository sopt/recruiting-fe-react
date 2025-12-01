import { Button } from '@sopt-makers/ui';
import Checkbox from '@/pages/QuestionPreview/components/Checkbox';
import SelectBox from '@/pages/QuestionPreview/components/SelectBox';

const BottomSection = () => {
  return (
    <section className="flex flex-col gap-[5rem]">
      <hr className="border-gray-100 w-full mt-[5rem] mb-[10rem]" />
      <SelectBox
        size="lg"
        label="동아리를 알게 된 경로"
        placeholder="지원 경로를 선택해 주세요"
        name="knownPath"
        options={[]}
        required
        disabled
      />
      <div className="flex flex-col">
        <p className="title_5_18_sb flex items-center mb-[1.6rem] w-[fit-content] text-gray-950">
          SOPT의 행사 및 세미나는 매주 토요일에 진행됩니다.
        </p>
        <Checkbox name="attendance" required>
          참석 가능합니다.
        </Checkbox>
      </div>
      <div>
        <Checkbox name="personalInformation" showRequiredDot>
          개인정보 수집 ‧ 이용에 동의합니다.
        </Checkbox>
      </div>
      <div className="flex gap-[1.2rem] mt-[3.4rem]">
        <Button
          theme="white"
          size="md"
          disabled={true}
          className="disabled:!bg-gray50 disabled:!text-white w-[12.6rem]"
        >
          임시저장
        </Button>
        <Button
          disabled={true}
          size="md"
          className="px-[!3.2rem] disabled:!bg-gray50 disabled:!text-white w-[12.6rem]"
        >
          제출하기
        </Button>
      </div>
    </section>
  );
};

BottomSection.displayName = 'BottomSection';

export default BottomSection;
