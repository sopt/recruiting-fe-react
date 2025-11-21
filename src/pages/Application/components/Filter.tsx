import { SelectV2, Toggle } from '@sopt-makers/ui';
import YbObRadioGroup from '@/components/YbObRadioGroup';
import type { ApplicantState } from '@/pages/Application/\btypes';
import type { GetGenerationResponse } from '@/pages/PostGeneration/types';

interface FilterProps {
  generationData: GetGenerationResponse;
  applicantInfo: ApplicantState;
  setApplicantInfo: (
    info: ApplicantState | ((prev: ApplicantState) => ApplicantState)
  ) => void;
}

const Filter = ({
  generationData,
  applicantInfo,
  setApplicantInfo,
}: FilterProps) => {
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
