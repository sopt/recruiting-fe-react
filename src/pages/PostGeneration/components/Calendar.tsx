import dayjs from 'dayjs';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import 'dayjs/locale/ko';
import { type MouseEvent, useState } from 'react';
import 'react-calendar/dist/Calendar.css';
import '@/styles/calendar.css';
import type { Value } from 'react-calendar/dist/shared/types.js';

interface Props {
  selectedDate: string[] | string | null;
  setSelectedDate: (dateRange: string[]) => void;
  selectedDateFieldName: string;
  error?: string;
  onDateSelect?: (date: string) => void;
  onClose?: () => void;
}

const formatCalendarDate = (date: Date) => {
  return dayjs(date).format('YYYY.MM.DD');
};

const WEEKDAYS = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const isValidDate = (dateString: string) => {
  const parsed = dayjs(dateString, 'YYYY.MM.DD', true);
  return parsed.isValid();
};

const CalendarInputForm = ({
  selectedDate,
  setSelectedDate,
  onClose,
}: Props) => {
  const [rangeValue, setRangeValue] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);

  const handleDateChange = (
    value: Date | [Date, Date],
    event: MouseEvent<HTMLButtonElement>,
  ) => {
    if (Array.isArray(value)) {
      setRangeValue(value);

      const [start, end] = value;
      if (start && end) {
        const formatted = [formatCalendarDate(start), formatCalendarDate(end)];
        setSelectedDate(formatted);
        onClose?.();
      }
    }
  };

  const CalendarComponent = () => (
    <Calendar
      value={
        selectedDate?.[0] && selectedDate?.[1] && isValidDate(selectedDate[0])
          ? [
              dayjs(selectedDate[0], 'YYYY.MM.DD').toDate(),
              dayjs(selectedDate[1], 'YYYY.MM.DD').toDate(),
            ]
          : [null, null]
      }
      selectRange
      formatDay={(locale, date) => dayjs(date).format('D')}
      formatShortWeekday={(locale, date) => WEEKDAYS[date.getDay()] ?? ''}
      showNeighboringMonth={false}
      next2Label={null}
      prev2Label={null}
      minDetail="month"
      maxDetail="month"
      onClickDay={handleDateChange}
      calendarType="gregory"
      onChange={(value: Value, event: MouseEvent<HTMLButtonElement>) =>
        handleDateChange(value as [Date, Date], event)
      }
    />
  );

  return <CalendarComponent />;
};

export default CalendarInputForm;
