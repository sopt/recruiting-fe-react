import { InfoCircle, Refresh } from '@/assets/svg';
import YbObRadioGroup from '@/components/YbObRadioGroup';
import BelowRateModal from '@/pages/Application/components/BelowRateModal';
import type { GROUP } from '@/pages/PostQuestion/types';
import { DialogContext, SelectV2, TextField, Toggle } from '@sopt-makers/ui';
import { type SetStateAction, useContext, useState } from 'react';
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
  const [group, setGroup] = useState<GROUP>('YB');

  const { openDialog, closeDialog } = useContext(DialogContext);

  const handleOpenDialog = () => {
    openDialog({
      title: '글자 수 미달률 상세 보기',
      description: <BelowRateModal onClose={closeDialog} />,
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
        <YbObRadioGroup group={group} setGroup={setGroup} />
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
