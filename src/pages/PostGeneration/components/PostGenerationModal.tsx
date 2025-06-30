import YbObRadioGroup from '@/components/YbObRadioGroup';
import PeriodCalendar from '@/pages/PostGeneration/components/PeriodCalendar';
import { usePostGeneration } from '@/pages/PostGeneration/hooks/queries';
import { formatDate } from '@/pages/PostGeneration/utils';
import {
  Button,
  Dialog,
  DialogContext,
  TextArea,
  TextField,
} from '@sopt-makers/ui';
import { type FormEvent, useContext, useState } from 'react';

const PostGenerationModal = () => {
  const [generationName, setGenerationName] = useState('');
  const [type, setType] = useState<'YB' | 'OB'>('YB');
  const [generation, setGeneration] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState<
    Record<string, string[]>
  >({
    application: ['', ''],
    interview: ['', ''],
    applicationResult: ['', ''],
    finalResult: ['', ''],
  });

  const { closeDialog } = useContext(DialogContext);

  const { mutate: postGeneration } = usePostGeneration({
    season: Number(generation),
    type,
    name: generationName,
    applicationStart: formatDate(selectedDateRange.application[0]),
    applicationEnd: formatDate(selectedDateRange.application[1]),
    interviewStart: formatDate(selectedDateRange.interview[0]),
    interviewEnd: formatDate(selectedDateRange.interview[1]),
    applicationResultStart: formatDate(selectedDateRange.applicationResult[0]),
    applicationResultEnd: formatDate(selectedDateRange.applicationResult[1]),
    finalResultStart: formatDate(selectedDateRange.finalResult[0]),
    finalResultEnd: formatDate(selectedDateRange.finalResult[1]),
  });

  const isDisabled =
    !generation ||
    selectedDateRange.application.some((value) => value === '') ||
    selectedDateRange.applicationResult.some((value) => value === '') ||
    selectedDateRange.interview.some((value) => value === '') ||
    selectedDateRange.finalResult.some((value) => value === '');

  const updateDateRange = (key: string, dateRange: string[]) => {
    setSelectedDateRange((prev) => ({
      ...prev,
      [key]: dateRange,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    postGeneration();
    closeDialog();
  };

  return (
    <div className="flex flex-col gap-[2.4rem] w-[58rem] h-[75vh]">
      <form
        className="flex flex-col w-[64rem] mt-[2.6rem] justify-between h-full"
        onSubmit={handleSubmit}
      >
        <div className="!flex !flex-col !gap-[3.2rem]">
          <div className="!flex !flex-col !gap-[0.8rem]">
            <TextArea
              topAddon={{
                labelText: '기수명',
              }}
              value={generationName}
              onChange={(e) => setGenerationName(e.target.value)}
              maxLength={30}
              placeholder="기수명을 입력하세요."
              className="[&>div:nth-child(2)]:!bg-gray700 [&>label]:!mb-[0.8rem]"
              required
            />
          </div>
          <div className="flex gap-[1.6rem]">
            <TextField
              value={generation}
              onChange={(e) => setGeneration(e.target.value)}
              labelText="기수"
              placeholder="기수를 입력하세요."
              className="[&>div:nth-child(2)]:!mt-[0.8rem] [&>div:nth-child(2)]:!bg-gray700 [&>div:nth-child(2)]:!w-[18rem]"
              required
            />
            <div className="flex-1 flex items-end mb-[1.1rem]">
              <YbObRadioGroup group={type} setGroup={setType} />
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
            selectedDateRange={selectedDateRange.applicationResult}
            onSelectDateRange={(dateRange) => {
              updateDateRange('applicationResult', dateRange);
            }}
          />
          <PeriodCalendar
            label="면접 기간"
            required
            selectedDateRange={selectedDateRange.interview}
            onSelectDateRange={(dateRange) => {
              updateDateRange('interview', dateRange);
            }}
          />
          <PeriodCalendar
            label="최종 결과 확인 기간"
            required
            selectedDateRange={selectedDateRange.finalResult}
            onSelectDateRange={(dateRange) =>
              updateDateRange('finalResult', dateRange)
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
