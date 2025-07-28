import CalendarInputForm from '@/pages/PostGeneration/components/Calendar';
import { IconCalendar } from '@sopt-makers/icons';
import { useEffect, useRef, useState } from 'react';

interface PeriodCalendarProps {
  label: string;
  required?: boolean;
  selectedDateRange: string[];
  onSelectDateRange: (dateRange: string[]) => void;
}

const PeriodCalendar = ({
  label,
  required = false,
  selectedDateRange,
  onSelectDateRange,
}: PeriodCalendarProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeInput, setActiveInput] = useState<'start' | 'end' | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedDateRange?.[0] && selectedDateRange?.[1] && isCalendarOpen) {
      setIsCalendarOpen(false);
      setActiveInput(null);
    }
  }, [selectedDateRange, isCalendarOpen]);

  const handleInputClick = (target: 'start' | 'end') => {
    setActiveInput(target);
    setIsCalendarOpen(true);
  };

  const handleDateSelect = (date: string) => {
    if (activeInput === 'start') {
      const end = selectedDateRange[1];
      if (end && date > end) {
        onSelectDateRange([end, date]);
      } else {
        onSelectDateRange([date, end]);
      }
    } else if (activeInput === 'end') {
      const start = selectedDateRange[0];
      if (start && date < start) {
        onSelectDateRange([date, start]);
      } else {
        onSelectDateRange([start, date]);
      }
    }
  };

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
          className="flex px-[1.6rem] py-[1.3rem] w-[20.5rem] gap-[2.6rem] text-gray10 bg-gray700 rounded-[10px] justify-between items-center cursor-pointer"
          onClick={() => handleInputClick('start')}
          onKeyUp={(e) => e.key === 'Enter' && handleInputClick('start')}
        >
          <input
            type="text"
            value={selectedDateRange?.[0] || ''}
            placeholder="YYYY.MM.DD"
            readOnly
            className="flex items-center w-[12.3rem] cursor-pointer text-[1.6rem] font-medium bg-transparent border-none placeholder:text-gray500 focus:outline-none"
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
            value={selectedDateRange?.[1] || ''}
            placeholder="YYYY.MM.DD"
            readOnly
            onClick={() => handleInputClick('end')}
            className="relative flex items-center w-[12.3rem] cursor-pointer text-[1.6rem] font-medium bg-transparent border-none placeholder:text-gray500 focus:outline-none"
          />
          <IconCalendar style={{ width: '24' }} />
        </div>
        {isCalendarOpen && (
          <div className="absolute z-[100] w-[33.6rem] h-auto top-full left-[5rem] mt-2 bg-gray600 text-gray10 p-4 rounded-2xl shadow-lg">
            <CalendarInputForm
              selectedDate={selectedDateRange}
              setSelectedDate={onSelectDateRange}
              selectedDateFieldName="date-range"
              onDateSelect={handleDateSelect}
              onClose={() => {
                setIsCalendarOpen(false);
              }}
            />
          </div>
        )}
      </div>
    </label>
  );
};

export default PeriodCalendar;
