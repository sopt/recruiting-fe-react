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
