import dayjs from 'dayjs';

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';

  return dayjs(dateString).format('YYYY-MM-DD');
};

export const canDeleteGeneration = (applicationStart: string) => {
  const startDate = new Date(applicationStart);
  const now = new Date();

  return startDate.getTime() < now.getTime();
};

// 서버 전달용 포맷팅
export const formatTime = (timeString: string): string => {
  if (!timeString) {
    return '';
  }

  const value = timeString.replace(/\D/g, '').padStart(4, '0');
  const hours = value.slice(0, 2);
  const minutes = value.slice(2, 4);

  const hour = Number.parseInt(hours, 10);
  const minute = Number.parseInt(minutes, 10);

  const time = dayjs(`2000-01-01 ${hours}:${minutes}`, 'YYYY-MM-DD HH:mm');

  if (hour > 23 || minute > 59 || hour < 0 || minute < 0 || !time.isValid()) {
    return '00:00:00';
  }

  if (time.minute() === 59) {
    return time.format('HH:mm:59');
  }

  return time.format('HH:mm:00');
};

// 인풋 값 포맷팅
export const formatTimeValue = (time: string) => {
  if (!time) {
    return '';
  }

  const value = time.replace(/\D/g, '');

  if (value.length <= 2) {
    return value;
  }

  const hours = value.slice(0, 2);
  const minutes = value.slice(2, 4);

  return `${hours}:${minutes}`;
};
