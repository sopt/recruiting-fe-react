import { IconCalendar } from '@sopt-makers/icons';
import { TextField } from '@sopt-makers/ui';
import { useEffect, useRef, useState } from 'react';
import CalendarInputForm from '@/pages/PostGeneration/components/Calendar';
import { formatTimeValue } from '@/pages/PostGeneration/utils';

interface PeriodCalendarProps {
  label: string;
  required?: boolean;
  selectedDateRange: string[];
  onSelectDateRange: (dateRange: string[]) => void;
  startTime: string;
  onStartTimeChange: (time: string) => void;
  endTime: string;
  onEndTimeChange: (time: string) => void;
}

const PeriodCalendar = ({
  label,
  required = false,
  selectedDateRange,
  onSelectDateRange,
  startTime,
  endTime,
  onStartTimeChange,
  onEndTimeChange,
}: PeriodCalendarProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [startTimeValue, setStartTimeValue] = useState(startTime);
  const [endTimeValue, setEndTimeValue] = useState(endTime);

  const [activeInput, setActiveInput] = useState<'start' | 'end' | null>(null);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setStartTimeValue(startTime);
    setEndTimeValue(endTime);
  }, [startTime, endTime]);

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
        <div className="flex gap-[1.2rem]">
          <button
            type="button"
            className="flex px-[1.6rem] py-[1.3rem] w-[17rem] text-gray10 bg-gray700 rounded-[10px] justify-between items-center cursor-pointer"
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
            <IconCalendar style={{ width: '24', flexShrink: 0 }} />
          </button>
          <TextField
            placeholder="00:00"
            className="w-[11.2rem] [&>div]:!bg-gray700"
            value={formatTimeValue(startTimeValue)}
            onChange={(e) => {
              const formattedValue = e.target.value.replace(/\D/g, '');
              setStartTimeValue(formattedValue);
              onStartTimeChange(formattedValue);
            }}
          />
        </div>

        <p className="text-gray-400 text-[1.4rem] font-semibold">-</p>
        <div className="flex gap-[1.2rem]">
          <button
            type="button"
            className="flex px-[1.6rem] py-[1.3rem] w-[17rem] text-gray10 bg-gray700 rounded-[10px] justify-between items-center"
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
            <IconCalendar style={{ width: '24', flexShrink: 0 }} />
          </button>
          <TextField
            placeholder="00:00"
            className="w-[11.2rem] [&>div]:!bg-gray700"
            value={formatTimeValue(endTimeValue)}
            onChange={(e) => {
              const formattedValue = e.target.value.replace(/\D/g, '');
              setEndTimeValue(formattedValue);
              onEndTimeChange(formattedValue);
            }}
          />
        </div>

        {isCalendarOpen && (
          <div className="absolute z-[100] w-[33.6rem] h-auto top-full left-[0rem] mt-[1.6rem] bg-gray600 text-gray10 p-4 rounded-2xl shadow-lg">
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
