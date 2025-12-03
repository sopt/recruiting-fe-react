import { IconXClose } from '@sopt-makers/icons';
import { SelectV2, TextField, Toggle } from '@sopt-makers/ui';
import YbObRadioGroup from '@/components/YbObRadioGroup';
import type { ApplicantState, PassInfo } from '@/pages/Application/\btypes';
import type { GetGenerationResponse } from '@/pages/PostGeneration/types';

interface FilterProps {
  generationData: GetGenerationResponse;
  applicantInfo: ApplicantState;
  searchApplicantValue: string;
  setApplicantInfo: (
    info: ApplicantState | ((prev: ApplicantState) => ApplicantState)
  ) => void;
  onSearchChange?: (value: string) => void;
}

const STATUS_OPTIONS = [
  { label: '최종 합격', value: 'FINAL_PASS' },
  { label: '서류 합격', value: 'INTERVIEW_PASS' },
  { label: '불합격', value: 'FAIL' },
  { label: '확인 전', value: 'NOT_EVALUATED' },
];

const Filter = ({
  generationData,
  applicantInfo,
  searchApplicantValue,
  setApplicantInfo,
  onSearchChange,
}: FilterProps) => {
  const handlePassStatusChange = (option: { value: PassInfo }) => {
    setApplicantInfo((prev) => {
      const targetValue = option.value;

      const statusArray = prev.passStatus
        ? prev.passStatus.split(',').filter(Boolean)
        : [];

      const isSelected = statusArray.includes(targetValue);

      const newArray = isSelected
        ? statusArray.filter((status) => status !== targetValue)
        : [...statusArray, targetValue];

      return {
        ...prev,
        passStatus: newArray.join(','),
      };
    });
  };

  return (
    <div className="flex flex-col gap-[3.2rem] mt-[3.2rem]">
      <div className="flex gap-[1.6rem]">
        <SelectV2.Root visibleOptions={7} type="text">
          <SelectV2.Trigger>
            <div>
              <SelectV2.TriggerContent
                placeholder={
                  generationData.seasons.length > 0
                    ? `${applicantInfo.season}기`
                    : '기수를 등록해주세요'
                }
              />
            </div>
          </SelectV2.Trigger>
          {generationData.seasons.length > 0 ? (
            <SelectV2.Menu>
              {generationData.seasons.map((option) => (
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
          ) : null}
        </SelectV2.Root>
        <YbObRadioGroup
          group={applicantInfo.group}
          onChange={(group) =>
            setApplicantInfo((prev) => ({
              ...prev,
              group,
            }))
          }
        />
      </div>
      <div className="flex flex-col gap-[0.8rem]">
        <div className="flex gap-[2.4rem]">
          <div className="flex flex-col gap-[0.8rem]">
            <span className="flex body_3_14_r text-gray100">지원자 검색</span>
            <TextField
              placeholder="지원자 성명 입력"
              value={searchApplicantValue}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-[24.7rem]"
              rightAddon={
                searchApplicantValue ? (
                  <IconXClose
                    className="cursor-pointer w-[2.4rem] h-[2.4rem]"
                    onClick={() => onSearchChange?.('')}
                  />
                ) : undefined
              }
            />
          </div>
          <div className="flex flex-col gap-[0.8rem]">
            <span className="flex body_3_14_r text-gray100">합격 여부</span>
            <SelectV2.Root visibleOptions={7} type="text" multiple>
              <SelectV2.Trigger>
                <div>
                  <SelectV2.TriggerContent placeholder={'전체'} />
                </div>
              </SelectV2.Trigger>
              {STATUS_OPTIONS.length > 0 ? (
                <SelectV2.Menu>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectV2.MenuItem
                      key={option.value}
                      option={{
                        label: option.label,
                        value: option.value,
                      }}
                      onClick={() =>
                        handlePassStatusChange({
                          value: option.value as PassInfo,
                        })
                      }
                    />
                  ))}
                </SelectV2.Menu>
              ) : null}
            </SelectV2.Root>
          </div>
          <div className="flex items-center gap-[0.8rem] self-end mb-[0.6rem]">
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
        </div>
      </div>
    </div>
  );
};

export default Filter;
