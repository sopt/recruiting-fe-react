import { InfoCircle, Refresh } from '@/assets/svg';
import YbObRadioGroup from '@/components/YbObRadioGroup';
import BelowRateModal from '@/pages/Application/components/BelowRateModal';
import { useGetGeneration } from '@/pages/PostGeneration/hooks/queries';
import type { Group } from '@/pages/PostQuestion/types';
import { DialogContext, SelectV2, TextField, Toggle } from '@sopt-makers/ui';
import { type SetStateAction, useContext } from 'react';
import type { Dispatch } from 'react';

interface FilterProps {
  setSeason: Dispatch<SetStateAction<string>>;
  group: Group;
  setGroup: Dispatch<SetStateAction<Group>>;
  isEvaluated: boolean;
  isDontRead: boolean;
  isPassedOnly: boolean;
  setIsEvaluated: Dispatch<SetStateAction<boolean>>;
  setIsDontRead: Dispatch<SetStateAction<boolean>>;
  setIsPassedOnly: Dispatch<SetStateAction<boolean>>;
}

const Filter = ({
  setSeason,
  group,
  setGroup,
  isEvaluated,
  isDontRead,
  isPassedOnly,
  setIsEvaluated,
  setIsDontRead,
  setIsPassedOnly,
}: FilterProps) => {
  const { openDialog, closeDialog } = useContext(DialogContext);

  const { data: generationData } = useGetGeneration(group);

  const handleOpenDialog = () => {
    openDialog({
      title: '글자 수 미달률 상세 보기',
      description: <BelowRateModal onClose={closeDialog} />,
    });
  };

  return (
    <div className="flex flex-col gap-[3.2rem] mt-[3.2rem]">
      <div className="flex gap-[1.6rem]">
        <SelectV2.Root visibleOptions={7} type="text">
          <SelectV2.Trigger>
            <div>
              <SelectV2.TriggerContent
                placeholder={generationData?.seasons[0].season.toString()}
              />
            </div>
          </SelectV2.Trigger>
          <SelectV2.Menu>
            {generationData?.seasons.map((option) => (
              <SelectV2.MenuItem
                key={option.season}
                option={{ label: option.season, value: option.season }}
                onClick={() => setSeason(option.season.toString())}
              />
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
              checked={isEvaluated}
              onClick={() => setIsEvaluated((prev) => !prev)}
            />
          </div>
          <div className="flex items-center gap-[0.8rem]">
            <span className="flex body_3_14_r text-gray100">읽마 숨기기</span>
            <Toggle
              size="lg"
              checked={isDontRead}
              onClick={() => setIsDontRead((prev) => !prev)}
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
