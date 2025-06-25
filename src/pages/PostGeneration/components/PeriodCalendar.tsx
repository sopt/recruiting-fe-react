import CalendarInputForm from '@/pages/PostGeneration/components/Calendar';
import { IconCalendar } from '@sopt-makers/icons';
import { useEffect, useRef, useState } from 'react';

interface Props {
  label: string;
  required?: boolean;
}

const PeriodCalendar = ({ label, required = false }: Props) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState<string[]>([
    '',
    '',
  ]);
  const [activeInput, setActiveInput] = useState<'start' | 'end' | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setIsCalendarOpen(false);
        setActiveInput(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isCalendarOpen]);

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
    <label className="flex flex-col gap-[0.8rem] text-gray-10 text-[1.4rem] font-semibold">
      <span className="flex text-white items-center label_3_14_sb gap-[0.4rem]">
        {label}
        {required && <span className="text-secondary">*</span>}
      </span>
      <div
        className="flex gap-[0.8rem] relative items-center"
        ref={calendarRef}
      >
        <div
          className="flex px-[1.6rem] py-[1.3rem] w-[20.5rem] text-gray10 bg-gray700 rounded-[10px] justify-between items-center cursor-pointer"
          onClick={() => handleInputClick('start')}
          onKeyUp={(e) => e.key === 'Enter' && handleInputClick('start')}
        >
          <input
            type="text"
            value={selectedDateRange[0]}
            placeholder="YYYY.MM.DD"
            readOnly
            className="flex items-center cursor-pointer text-[1.6rem] font-medium bg-transparent border-none placeholder:text-gray500 focus:outline-none"
          />
          <IconCalendar style={{ width: '24' }} />
        </div>

        <p className="text-gray-400 text-[1.4rem] font-semibold">-</p>

        <div
          className="flex px-[1.6rem] py-[1.3rem] w-[20.5rem] text-gray10 bg-gray700 rounded-[10px] justify-between items-center cursor-pointer"
          onClick={() => handleInputClick('end')}
          onKeyUp={(e) => e.key === 'Enter' && handleInputClick('end')}
        >
          <input
            type="text"
            value={selectedDateRange[1]}
            placeholder="YYYY.MM.DD"
            readOnly
            className="relative flex items-center cursor-pointer text-[1.6rem] font-medium bg-transparent border-none placeholder:text-gray500 focus:outline-none"
          />
          <IconCalendar style={{ width: '24' }} />
        </div>
        {isCalendarOpen && (
          <div className="absolute z-[9999] top-full left-0 mt-2 bg-gray700 text-gray10 p-4 w-[320px] rounded-2xl shadow-lg">
            <CalendarInputForm
              dateType="range"
              selectedDate={selectedDateRange}
              setSelectedDate={setSelectedDateRange}
              selectedDateFieldName="date-range"
              onDateSelect={handleDateSelect}
              onClose={() => setIsCalendarOpen(false)}
            />
          </div>
        )}
      </div>
    </label>
  );
};

export default PeriodCalendar;
