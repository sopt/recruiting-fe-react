import YbObRadioGroup from '@/components/YbObRadioGroup';
import PeriodCalendar from '@/pages/PostGeneration/components/PeriodCalendar';
import type { GROUP } from '@/pages/Question/types';
import { Button, Dialog, DialogContext, TextField } from '@sopt-makers/ui';
import { type FormEvent, useContext, useState } from 'react';

const PostGenerationModal = () => {
  const [group, setGroup] = useState<GROUP>('YB');
  const [generation, setGeneration] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState<
    Record<string, string[]>
  >({
    application: ['', ''],
    documentPass: ['', ''],
    finalPass: ['', ''],
  });

  const { closeDialog } = useContext(DialogContext);

  const isDisabled =
    !generation ||
    selectedDateRange.application.some((value) => value === '') ||
    selectedDateRange.documentPass.some((value) => value === '') ||
    selectedDateRange.finalPass.some((value) => value === '');

  const updateDateRange = (key: string, dateRange: string[]) => {
    setSelectedDateRange((prev) => ({
      ...prev,
      [key]: dateRange,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: 기수 등록 로직 구현
    closeDialog();
  };

  return (
    <div className="flex flex-col gap-[2.4rem] w-[58rem] h-[70vh]">
      <form
        className="flex flex-col w-[64rem] mt-[2.6rem] justify-between h-full"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-[3.2rem]">
          <div className="flex gap-[1.6rem]">
            <TextField
              value={generation}
              onChange={(e) => setGeneration(e.target.value)}
              labelText="기수"
              placeholder="기수를 입력하세요."
              className="[&>div:nth-child(2)]:!bg-gray700 [&>div:nth-child(2)]:!w-[18rem]"
              required
            />
            <div className="flex-1 flex items-end mb-[1.1rem]">
              <YbObRadioGroup group={group} setGroup={setGroup} />
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
        </div>
        <Dialog.Footer align="right">
          <Button theme="black">취소하기 </Button>
          <Button disabled={isDisabled} type="submit">
            등록하기
          </Button>
        </Dialog.Footer>
      </form>
    </div>
  );
};

export default PostGenerationModal;
