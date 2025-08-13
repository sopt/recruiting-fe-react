import dayjs from 'dayjs';

export const formatDateWithBar = (dateString: string): string => {
  if (!dateString) return '';

  return dayjs(dateString).format('YYYY-MM-DD');
};

export const formatDate = (dateString: string): string => {
  if (!dateString) return '';

  return dayjs(dateString).format('YYYY.MM.DD');
};

export const formatFullDate = (dateString: string): string => {
  if (!dateString) return '';

  return dayjs(dateString).format('YYYY.MM.DD HH:mm');
};

export const canDeleteGeneration = (applicationStart: string) => {
  const startDate = new Date(applicationStart);
  const now = new Date();

  return startDate.getTime() < now.getTime();
};

// 서버 전달용 포맷팅
export const formatTime = (inputTime: string) => {
  if (!inputTime) {
    return '';
  }

  const hour = Number.parseInt(inputTime.slice(0, 2), 10);
  const minute = Number.parseInt(inputTime.slice(2, 4), 10);
  const time = dayjs(`2000-01-01 ${hour}:${minute}`, 'YYYY-MM-DD HH:mm');

  if (hour > 23 || minute > 59 || hour < 0 || minute < 0 || !time.isValid()) {
    return '00:00:00';
  }

  if (hour === 24) {
    return time.format('00:mm:ss');
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
