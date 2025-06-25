import YbObRadioGroup from '@/components/YbObRadioGroup';
import PeriodCalendar from '@/pages/PostGeneration/components/PeriodCalendar';
import { Button, Dialog, TextField } from '@sopt-makers/ui';
import { useState } from 'react';

const PostGenerationModal = () => {
  const [selectedDateRange, setSelectedDateRange] = useState<string[]>([
    '',
    '',
  ]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeInput, setActiveInput] = useState<'start' | 'end' | null>(null);

  const handleInputClick = (target: 'start' | 'end') => {
    setActiveInput(target);
    setIsCalendarOpen(true);
  };

  const handleDateSelect = (date: string) => {
    if (activeInput === 'start') {
      const end = selectedDateRange[1];
      if (end && date > end) {
        setSelectedDateRange([end, date]);
      } else {
        setSelectedDateRange([date, end]);
      }
    } else if (activeInput === 'end') {
      const start = selectedDateRange[0];
      if (start && date < start) {
        setSelectedDateRange([date, start]);
      } else {
        setSelectedDateRange([start, date]);
      }
    }
  };

  return (
    <div className="flex flex-col gap-[2.4rem] w-[58rem] h-[70vh] justify-between">
      <form className="flex flex-col gap-[3.2rem] w-[64rem] mt-[2.6rem]">
        <div className="flex gap-[1.6rem]">
          <TextField
            labelText="기수"
            placeholder="기수를 입력하세요."
            required
          />
          <div className="flex-1 flex items-end mb-[1.1rem]">
            <YbObRadioGroup />
          </div>
        </div>
        <PeriodCalendar label="서류 지원 기간" required />
        <PeriodCalendar label="서류 합격 확인 기간" required />
        <PeriodCalendar label="최종 합격 확인 기간" required />
      </form>

      <Dialog.Footer align="right">
        <Button theme="black">취소하기 </Button>
        <Button disabled>등록하기</Button>
      </Dialog.Footer>
    </div>
  );
};

export default PostGenerationModal;
