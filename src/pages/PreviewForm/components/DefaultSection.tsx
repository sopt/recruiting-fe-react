import { Profile } from '@/assets/svg';
import InputLine from '@/pages/PreviewForm/components/InputLine';
import Radio from '@/pages/PreviewForm/components/Radio';
import SelectBox from '@/pages/PreviewForm/components/SelectBox';
import TextBox from '@/pages/PreviewForm/components/TextBox';

const DEFAULT_PROFILE = [
  '사진은 면접 참고용으로만 이용됩니다.',
  '사진으로 본인 확인이 불가능한 경우 면접이 불가합니다.\n  예) 마스크 착용, 선글라스 착용 등',
  '사진은 10MB 이하, 3x4의 비율로 넣어주세요.',
];

const ProfileImage = () => {
  return (
    <TextBox label="사진" name="picture" required size="lg">
      <div className="flex items-center gap-7">
        <div>
          <div
            className={`
              relative flex justify-center items-center p-1.5 
              border rounded-[10px] cursor-not-allowed
              w-[134px] h-[176px]
              border-gray-300
            `}
          >
            <Profile className="w-[2.4rem] h-[2.4rem]" />
          </div>
        </div>
        <ul className="flex flex-col gap-2 pb-7">
          {DEFAULT_PROFILE.map((el: string) => (
            <li
              key={el}
              className="text-gray-500 body_2_16_r whitespace-pre-wrap"
            >
              &#183; {el}
            </li>
          ))}
        </ul>
      </div>
    </TextBox>
  );
};

interface DefaultSectionProps {
  isReview?: boolean;
  refCallback?: (elem: HTMLSelectElement) => void;
}

const DefaultSection = ({ refCallback }: DefaultSectionProps) => {
  return (
    <section
      ref={refCallback}
      id="default"
      className="flex flex-col gap-[50px] pt-[3rem] w-[72rem]"
    >
      <h2 className="title_2_28_sb text-gray-950">기본 인적사항</h2>

      <ProfileImage />

      <div className="flex gap-2">
        <TextBox label="이름" name="name" required size="sm">
          <InputLine
            value={''}
            name="name"
            placeholder="김솝트"
            readOnly
            disabled
          />
        </TextBox>
        <SelectBox
          defaultValue={''}
          placeholder="성별을 선택해주세요."
          label="성별"
          name="gender"
          options={[]}
          required
          disabled
        />
      </div>

      <div className="flex gap-2">
        <TextBox label="생년월일" name="birthday" required size="sm">
          <InputLine
            name="birthday"
            placeholder="YYYY/MM/DD"
            defaultValue={''}
            disabled
          />
        </TextBox>
        <TextBox label="연락처" name="phone" required size="sm">
          <InputLine
            value={''}
            placeholder="010-1234-1234"
            name="phone"
            readOnly
            disabled
          />
        </TextBox>
      </div>

      <TextBox label="이메일" name="email" required size="lg">
        <InputLine
          value={''}
          placeholder="sopt@sopt.org"
          name="email"
          readOnly
          disabled
        />
      </TextBox>

      <TextBox label="거주지" name="address" required size="lg">
        <InputLine
          name="address"
          placeholder="예) 서울특별시 관악구 신림동"
          value={''}
          disabled
        />
      </TextBox>

      <TextBox label="지하철역" name="nearestStation" required size="lg">
        <InputLine
          defaultValue={''}
          name="nearestStation"
          placeholder="ex. 성신여대입구"
          disabled
        />
      </TextBox>

      <div className="flex gap-2">
        <TextBox label="학교" name="college" required size="sm">
          <InputLine
            defaultValue={''}
            name="college"
            placeholder="학교 이름을 정확하게 적어주세요."
            disabled
          />
        </TextBox>
        <div style={{ margin: '52px 0 0 22px' }}>
          <Radio
            defaultValue={'재학'}
            label={['재학', '휴학 ‧ 수료 ‧ 유예']}
            name="leaveAbsence"
            required
          />
        </div>
      </div>

      <div className="flex gap-2">
        <TextBox label="학과" name="major" required size="sm">
          <InputLine
            defaultValue={''}
            name="major"
            placeholder="학과 이름을 정확하게 적어주세요. "
            disabled
          />
        </TextBox>
        <SelectBox
          defaultValue={''}
          label="학년"
          name="univYear"
          placeholder="학년을 선택해주세요."
          options={[]}
          required
          disabled
        />
      </div>

      <SelectBox
        defaultValue={''}
        label="이전 기수 활동 여부 (제명 포함)"
        name="mostRecentSeason"
        placeholder="이전 기수 활동 여부를 선택해주세요."
        options={['33기', '34기', '35기', '36기']}
        required
        size="lg"
        disabled
      />
    </section>
  );
};

DefaultSection.displayName = 'DefaultSection';

export default DefaultSection;
