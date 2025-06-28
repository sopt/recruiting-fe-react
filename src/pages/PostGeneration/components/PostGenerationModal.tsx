import YbObRadioGroup from '@/components/YbObRadioGroup';
import PeriodCalendar from '@/pages/PostGeneration/components/PeriodCalendar';
import { Button, Dialog, TextField } from '@sopt-makers/ui';
import { useState } from 'react';

const PostGenerationModal = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<
    Record<string, string[]>
  >({
    application: ['', ''],
    documentPass: ['', ''],
    finalPass: ['', ''],
  });

  console.log(selectedDateRange);

  const updateDateRange = (key: string, dateRange: string[]) => {
    setSelectedDateRange((prev) => ({
      ...prev,
      [key]: dateRange,
    }));
  };

  return (
    <div className="flex flex-col gap-[2.4rem] w-[58rem] h-[70vh] justify-between">
      <form className="flex flex-col gap-[3.2rem] w-[64rem] mt-[2.6rem]">
        <div className="flex gap-[1.6rem]">
          <TextField
            labelText="기수"
            placeholder="기수를 입력하세요."
            className="[&>div:nth-child(2)]:!bg-gray700 [&>div:nth-child(2)]:!w-[18rem]"
            required
          />
          <div className="flex-1 flex items-end mb-[1.1rem]">
            <YbObRadioGroup />
          </div>
        </div>
        <PeriodCalendar
          label="서류 접수 기간"
          required
          selectedDateRange={selectedDateRange.application}
          onSelectDateRange={(dateRange) => {
            updateDateRange('application', dateRange);
          }}
        />
        <PeriodCalendar
          label="서류 결과 확인 기간"
          required
          selectedDateRange={selectedDateRange.documentPass}
          onSelectDateRange={(dateRange) => {
            updateDateRange('documentPass', dateRange);
          }}
        />
        <PeriodCalendar
          label="최종 결과 확인 기간"
          required
          selectedDateRange={selectedDateRange.finalPass}
          onSelectDateRange={(dateRange) =>
            updateDateRange('finalPass', dateRange)
          }
        />
      </form>

      <Dialog.Footer align="right">
        <Button theme="black">취소하기 </Button>
        <Button disabled>등록하기</Button>
      </Dialog.Footer>
    </div>
  );
};

export default PostGenerationModal;
