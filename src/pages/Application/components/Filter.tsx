import { InfoCircle, Refresh } from '@/assets/svg';
import YbObRadioGroup from '@/components/YbObRadioGroup';
import type {
  ApplicantState,
  QuestionCharLimit,
} from '@/pages/Application/\btypes';
import MinimumRateModal from '@/pages/Application/components/MinimumRateModal';
import { usePostMinRate } from '@/pages/Application/hooks/queries';
import { isNumberValue } from '@/pages/Application/utils/regex';
import type { GetGenerationResponse } from '@/pages/PostGeneration/types';
import { decimalToPercentage } from '@/utils';
import { DialogContext, SelectV2, TextField, Toggle } from '@sopt-makers/ui';
import { useCallback, useContext, useMemo, useState } from 'react';
import type { ChangeEvent } from 'react';

interface FilterProps {
  generationData: GetGenerationResponse;
  applicantInfo: ApplicantState;
  setApplicantInfo: (
    info: ApplicantState | ((prev: ApplicantState) => ApplicantState),
  ) => void;
  onRefresh?: () => void;
}

const Filter = ({
  generationData,
  applicantInfo,
  setApplicantInfo,
  onRefresh,
}: FilterProps) => {
  const [minimumRate, setMinimumRate] = useState<number | null>(null);
  const [minimumRatePercent, setMinimumRatePercent] = useState<string>('');
  const [, setQuestions] = useState<QuestionCharLimit[]>([]);

  const { openDialog, closeDialog } = useContext(DialogContext);
  const { mutate: postMinRate } = usePostMinRate();

  const minRateValue = useMemo(
    () => (minimumRate === null ? 0 : decimalToPercentage(minimumRate)),
    [minimumRate],
  );

  const handleRefresh = useCallback(() => {
    setApplicantInfo((prev) => ({
      ...prev,
      minRate: minRateValue,
    }));

    onRefresh?.();
  }, [minRateValue, setApplicantInfo, onRefresh]);

  const handleChangeMinimumRate = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;

      if (isNumberValue(value)) {
        setMinimumRatePercent(value);
        setMinimumRate(value === '' ? null : Number(value));
      }
    },
    [],
  );

  const handleBlurMinimumRate = useCallback(() => {
    if (minimumRatePercent !== '') {
      setMinimumRatePercent(`${minimumRatePercent}%`);
    }
  }, [minimumRatePercent]);

  const handleFocusMinimumRate = useCallback(() => {
    setMinimumRatePercent((prev) => prev.replace(/%/g, ''));
  }, []);

  const handleOpenDialog = () => {
    postMinRate(
      {
        minimumRate: minimumRate ? decimalToPercentage(minimumRate) : 0,
        season: Number(applicantInfo.season) || 0,
        group: applicantInfo.group,
        selectedPart: applicantInfo.selectedPart,
      },
      {
        onSuccess: (data) => {
          setQuestions(data.data.questions);
          openDialog({
            title: '글자 수 미달률 지원서 상세 보기',
            description: (
              <MinimumRateModal
                minimumRate={minimumRate ?? 1}
                questions={data.data.questions}
                onClose={closeDialog}
              />
            ),
          });
        },
      },
    );
  };

  return (
    <div className="flex flex-col gap-[3.2rem] mt-[3.2rem]">
      <div className="flex gap-[1.6rem]">
        <SelectV2.Root visibleOptions={7} type="text">
          <SelectV2.Trigger>
            <div>
              <SelectV2.TriggerContent
                placeholder={`${applicantInfo.season || generationData?.seasons[0]?.season.toString()}기`}
              />
            </div>
          </SelectV2.Trigger>
          <SelectV2.Menu>
            {generationData?.seasons.map((option) => (
              <SelectV2.MenuItem
                key={option.season}
                option={{
                  label: `${option.season.toString()}기`,
                  value: option.season.toString(),
                }}
                onClick={() =>
                  setApplicantInfo((prev) => ({
                    ...prev,
                    season: option.season.toString(),
                  }))
                }
              />
            ))}
          </SelectV2.Menu>
        </SelectV2.Root>
        <YbObRadioGroup
          group={applicantInfo.group}
          onChangeGroup={(group) =>
            setApplicantInfo((prev) => ({
              ...prev,
              group,
            }))
          }
        />
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <button
          type="button"
          className="flex items-center gap-[0.4rem] body_3_14_r text-gray100 cursor-pointer"
          onClick={handleOpenDialog}
        >
          글자 수 미달 지원서 숨기기 <InfoCircle width={16} height={16} />
        </button>
        <div className="flex gap-[2.4rem]">
          <div className="flex gap-[0.6rem] items-center">
            <TextField
              placeholder="미달률 입력"
              value={minimumRatePercent}
              onChange={handleChangeMinimumRate}
              onBlur={handleBlurMinimumRate}
              onFocus={handleFocusMinimumRate}
              disabled={applicantInfo.selectedPart === '전체'}
            />
            <button
              type="button"
              className="bg-gray800 rounded-[1rem] px-[1.6rem] py-[1.4rem] flex items-center justify-center cursor-pointer hover:bg-gray700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={handleRefresh}
              disabled={minimumRate === null}
            >
              <Refresh width={20} height={20} />
            </button>
          </div>
          <div className="flex items-center gap-[0.8rem]">
            <span className="flex body_3_14_r text-gray100">읽마 숨기기</span>
            <Toggle
              size="lg"
              checked={applicantInfo.dontReadInfo.checkedByMe}
              onClick={() =>
                setApplicantInfo((prev) => ({
                  ...prev,
                  dontReadInfo: {
                    ...prev.dontReadInfo,
                    checkedByMe: !prev.dontReadInfo.checkedByMe,
                  },
                }))
              }
            />
          </div>
          <div className="flex items-center gap-[0.8rem]">
            <span className="flex body_3_14_r text-gray100">
              평가 완료 숨기기
            </span>
            <Toggle
              size="lg"
              checked={applicantInfo.evaluatedInfo.checkedByMe}
              onClick={() =>
                setApplicantInfo((prev) => ({
                  ...prev,
                  evaluatedInfo: {
                    ...prev.evaluatedInfo,
                    checkedByMe: !prev.evaluatedInfo.checkedByMe,
                  },
                }))
              }
            />
          </div>
          <div className="flex items-center gap-[0.8rem]">
            <span className="flex body_3_14_r text-gray100">
              서류 합격자만 보기
            </span>
            <Toggle
              size="lg"
              checked={applicantInfo.isPassedOnly}
              onClick={() =>
                setApplicantInfo((prev) => ({
                  ...prev,
                  isPassedOnly: !prev.isPassedOnly,
                }))
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
