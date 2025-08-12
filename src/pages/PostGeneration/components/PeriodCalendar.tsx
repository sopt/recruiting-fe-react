import { IconCalendar } from '@sopt-makers/icons';
import { TextField } from '@sopt-makers/ui';
import { useEffect, useRef, useState } from 'react';
import { type Control, type FieldError, useController } from 'react-hook-form';
import CalendarInputForm from '@/pages/PostGeneration/components/Calendar';
import type {
  DateRangeField,
  PostGenerationFormData,
  TimeField,
} from '@/pages/PostGeneration/types';
import { formatTimeValue } from '@/pages/PostGeneration/utils';

interface PeriodCalendarProps {
  label: string;
  required?: boolean;
  dateRange: DateRangeField;
  startTime: TimeField;
  endTime: TimeField;
  control: Control<PostGenerationFormData>;
  startTimeError?: FieldError;
  endTimeError?: FieldError;
}

const PeriodCalendar = ({
  label,
  required = false,
  dateRange,
  startTime,
  endTime,
  control,
  startTimeError,
  endTimeError,
}: PeriodCalendarProps) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [activeInput, setActiveInput] = useState<'start' | 'end' | null>(null);

  const calendarRef = useRef<HTMLDivElement>(null);

  const { field: dateRangeField } = useController({
    name: dateRange,
    control,
  });

  const { field: startTimeField } = useController({
    name: startTime,
    control,
  });

  const { field: endTimeField } = useController({
    name: endTime,
    control,
  });

  const handleInputClick = (target: 'start' | 'end') => {
    setActiveInput(target);
    setIsCalendarOpen(true);
  };

  const handleCloseCalendar = () => {
    setIsCalendarOpen(false);
    setActiveInput(null);
  };

  const selectedDateRange = [
    dateRangeField.value?.start,
    dateRangeField.value?.end,
  ];

  const handleDateSelect = (date: string) => {
    if (activeInput === 'start') {
      const end = selectedDateRange[1];
      if (end && date > end) {
        dateRangeField.onChange({ start: end, end: date });
      } else {
        dateRangeField.onChange({ start: date, end });
      }
    } else if (activeInput === 'end') {
      const start = selectedDateRange[0];
      if (start && date < start) {
        dateRangeField.onChange({ start: date, end: start });
      } else {
        dateRangeField.onChange({ start, end: date });
      }
    }
  };

  const handleOnSelectDateRange = (dateRange: string[]) => {
    dateRangeField.onChange({
      start: dateRange[0],
      end: dateRange[1],
    });

    if (dateRange[0] && dateRange[1]) {
      handleCloseCalendar();
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        handleCloseCalendar();
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
            onMouseDown={() => handleInputClick('start')}
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
            value={formatTimeValue(startTimeField.value || '')}
            onChange={(e) => {
              const formattedValue = e.target.value.replace(/\D/g, '');
              startTimeField.onChange(formattedValue);
            }}
            isError={!!startTimeError}
          />
        </div>

        <p className="text-gray-400 text-[1.4rem] font-semibold">-</p>

        <div className="flex gap-[1.2rem]">
          <button
            type="button"
            className="flex px-[1.6rem] py-[1.3rem] w-[17rem] text-gray10 bg-gray700 rounded-[10px] justify-between items-center"
            onMouseDown={() => handleInputClick('end')}
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
            value={formatTimeValue(endTimeField.value || '')}
            onChange={(e) => {
              const formattedValue = e.target.value.replace(/\D/g, '');
              endTimeField.onChange(formattedValue);
            }}
            isError={!!endTimeError}
          />
        </div>

        {isCalendarOpen && (
          <div className="absolute z-[100] w-[33.6rem] h-auto top-full left-[0rem] mt-[1.6rem] bg-gray600 text-gray10 p-4 rounded-2xl shadow-lg">
            <CalendarInputForm
              selectedDate={selectedDateRange}
              setSelectedDate={handleOnSelectDateRange}
              selectedDateFieldName="date-range"
              onDateSelect={handleDateSelect}
              onClose={handleCloseCalendar}
            />
          </div>
        )}
      </div>
    </label>
  );
};

export default PeriodCalendar;
