import { InfoCircle, Refresh } from '@/assets/svg';

import {
  useGetApplicantList,
  usePostMinRate,
} from '@/pages/Application/hooks/queries';
import { isNumberValue } from '@/pages/Application/utils/regex';

import type {
  ApplicantState,
  QuestionCharLimit,
} from '@/pages/Application/\btypes';
import MinimumRateModal from '@/pages/Application/components/MinimumRateModal';
import type { GetGenerationResponse } from '@/pages/PostGeneration/types';

import YbObRadioGroup from '@/components/YbObRadioGroup';
import { decimalToPercentage } from '@/utils';
import { DialogContext, SelectV2, TextField, Toggle } from '@sopt-makers/ui';
import { useContext, useState } from 'react';
import type { ChangeEvent } from 'react';

interface FilterProps {
  generationData: GetGenerationResponse;
  applicantInfo: ApplicantState;
  setApplicantInfo: (
    info: ApplicantState | ((prev: ApplicantState) => ApplicantState),
  ) => void;
}

const Filter = ({
  generationData,
  applicantInfo,
  setApplicantInfo,
}: FilterProps) => {
  const [minimumRate, setMinimumRate] = useState<number | null>(null);
  const [, setQuestions] = useState<QuestionCharLimit[]>([]);

  const { openDialog, closeDialog } = useContext(DialogContext);

  const { mutate: postMinRate } = usePostMinRate();
  const { refetch } = useGetApplicantList({
    season: Number(applicantInfo.season),
    group: applicantInfo.group,
    part: applicantInfo.selectedPart,
    offset: 0,
    limit: 10,
    minRate: decimalToPercentage(minimumRate),
    hideEvaluated: applicantInfo.isEvaluated,
    hideDontRead: applicantInfo.isDontRead,
    checkInterviewPass: applicantInfo.isPassedOnly,
  });

  const handleChangeMinimumRate = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (isNumberValue(value)) {
      setMinimumRate(value === '' ? null : Number(value));
    }
  };

  const handleRefresh = () => {
    const minRateValue =
      minimumRate === null ? 1 : decimalToPercentage(minimumRate);

    setApplicantInfo((prev) => ({
      ...prev,
      minRate: minRateValue,
    }));

    refetch();
  };

  const handleOpenDialog = () => {
    postMinRate(
      {
        minimumRate: minimumRate ? decimalToPercentage(minimumRate) : 1,
        season: Number(applicantInfo.season) || 0,
        group: applicantInfo.group,
        selectedPart: applicantInfo.selectedPart,
      },
      {
        onSuccess: (data) => {
          setQuestions(data.data.questions);
          openDialog({
            title: '글자 수 미달률 상세 보기',
            description: (
              <MinimumRateModal
                minimumRate={minimumRate ?? 0}
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
                placeholder={
                  applicantInfo.season ||
                  generationData?.seasons[0]?.season.toString()
                }
              />
            </div>
          </SelectV2.Trigger>
          <SelectV2.Menu>
            {generationData?.seasons.map((option) => (
              <SelectV2.MenuItem
                key={option.season}
                option={{ label: option.season, value: option.season }}
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
          글자 수 미달 숨기기 <InfoCircle width={16} height={16} />
        </button>
        <div className="flex gap-[2.4rem]">
          <div className="flex gap-[0.6rem] items-center">
            <TextField
              placeholder="미달률 입력"
              value={minimumRate !== null ? minimumRate.toString() : ''}
              onChange={handleChangeMinimumRate}
            />
            <button
              type="button"
              className="bg-gray800 rounded-[1rem] px-[1.6rem] py-[1.4rem] flex items-center justify-center cursor-pointer hover:bg-gray700 transition-colors duration-200"
              onClick={handleRefresh}
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
              checked={applicantInfo.isEvaluated}
              onClick={() =>
                setApplicantInfo((prev) => ({
                  ...prev,
                  isEvaluated: !prev.isEvaluated,
                }))
              }
            />
          </div>
          <div className="flex items-center gap-[0.8rem]">
            <span className="flex body_3_14_r text-gray100">읽마 숨기기</span>
            <Toggle
              size="lg"
              checked={applicantInfo.isDontRead}
              onClick={() =>
                setApplicantInfo((prev) => ({
                  ...prev,
                  isDontRead: !prev.isDontRead,
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
