import { InfoCircle, Refresh } from '@/assets/svg';
import YbObRadioGroup from '@/components/YbObRadioGroup';
import { DialogContext, SelectV2, TextField, Toggle } from '@sopt-makers/ui';
import { type SetStateAction, useContext } from 'react';
import type { Dispatch } from 'react';

const START_GENERATION = 30;
const END_GENERATION = 36;

const GENERATION_OPTIONS = Array.from(
  { length: END_GENERATION - START_GENERATION + 1 },
  (_, index) => {
    const generation = END_GENERATION - index;
    return {
      label: `${generation}기`,
      value: generation.toString(),
    };
  },
);

interface FilterProps {
  isCompleteHidden: boolean;
  isDoNotRead: boolean;
  isPassedOnly: boolean;
  setIsCompleteHidden: Dispatch<SetStateAction<boolean>>;
  setIsDoNotRead: Dispatch<SetStateAction<boolean>>;
  setIsPassedOnly: Dispatch<SetStateAction<boolean>>;
}

const Filter = ({
  isCompleteHidden,
  isDoNotRead,
  isPassedOnly,
  setIsCompleteHidden,
  setIsDoNotRead,
  setIsPassedOnly,
}: FilterProps) => {
  const { openDialog } = useContext(DialogContext);

  const handleOpenDialog = () => {
    openDialog({
      title: '글자 수 미달률 상세 보기',
      description: (
        <div className="flex flex-col gap-[2.4rem] min-w-[35.2rem]">
          <span className="break-keep">
            지원서 항목 중 하나라도 그 항목의 최대 글자 수 기준에 미달한
            지원자를 숨깁니다.
          </span>
          <div className="p-[1.6rem] bg-gray700 rounded-[1.2rem] flex flex-col gap-[2.4rem]">
            <h3 className="title_5_18_sb text-white">
              입력된 % 적용시 최소 글자수
            </h3>
            <div className="flex gap-[7.2rem] px-[1.6rem] w-full justify-between flex-wrap">
              <span className="flex body_3_14_r text-gray100 w-[10.8rem] justify-between">
                <p>-</p>
                <p>/</p>
                <p>500</p>
              </span>
              <span className="flex body_3_14_r text-gray100 w-[10.8rem] justify-between">
                <p>-</p>
                <p>/</p>
                <p>500</p>
              </span>
              <span className="flex body_3_14_r text-gray100 w-[10.8rem] justify-between">
                <p>-</p>
                <p>/</p>
                <p>500</p>
              </span>
              <span className="flex body_3_14_r text-gray100 w-[10.8rem] justify-between">
                <p>-</p>
                <p>/</p>
                <p>500</p>
              </span>
              <span className="flex body_3_14_r text-gray100 w-[10.8rem] justify-between">
                <p>-</p>
                <p>/</p>
                <p>500</p>
              </span>
            </div>
          </div>
        </div>
      ),
    });
  };

  return (
    <div className="flex flex-col gap-[3.2rem] mt-[3.2rem]">
      <div className="flex gap-[1.5rem]">
        <SelectV2.Root type="text">
          <SelectV2.Trigger>
            <div>
              <SelectV2.TriggerContent placeholder="36기" />
            </div>
          </SelectV2.Trigger>
          <SelectV2.Menu>
            {GENERATION_OPTIONS.map((option) => (
              <SelectV2.MenuItem key={option.value} option={option} />
            ))}
          </SelectV2.Menu>
        </SelectV2.Root>
        <YbObRadioGroup />
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <button
          type="button"
          className="flex items-center gap-[0.4rem] body_3_14_r text-gray100 cursor-pointer"
          onClick={handleOpenDialog}
        >
          글자 수 미달 숨기기 <InfoCircle width={16} height={16} />
        </button>
        <div className="flex gap-[2.4rem]">
          <div className="flex gap-[0.6rem] items-center">
            <TextField placeholder="미달률 입력" />
            <button
              type="button"
              className="bg-gray800 rounded-[1rem] px-[1.6rem] py-[1.4rem] flex items-center justify-center cursor-pointer hover:bg-gray700 transition-colors duration-200"
            >
              <Refresh width={20} height={20} />
            </button>
          </div>
          <div className="flex items-center gap-[0.8rem]">
            <span className="flex body_3_14_r text-gray100">
              평가 완료 숨기기
            </span>
            <Toggle
              size="lg"
              checked={isCompleteHidden}
              onClick={() => setIsCompleteHidden((prev) => !prev)}
            />
          </div>
          <div className="flex items-center gap-[0.8rem]">
            <span className="flex body_3_14_r text-gray100">읽마 숨기기</span>
            <Toggle
              size="lg"
              checked={isDoNotRead}
              onClick={() => setIsDoNotRead((prev) => !prev)}
            />
          </div>
          <div className="flex items-center gap-[0.8rem]">
            <span className="flex body_3_14_r text-gray100">
              서류 합격자만 보기
            </span>
            <Toggle
              size="lg"
              checked={isPassedOnly}
              onClick={() => setIsPassedOnly((prev) => !prev)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
