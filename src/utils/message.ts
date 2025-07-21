import { ExecutiveType } from '@/types';

export const getDoNotReadMessage = (item: string[]) => {
  if (item.length === 0) return null;

  const selectedParts = item.map(
    (part) => ExecutiveType[part as keyof typeof ExecutiveType],
  );

  return `${selectedParts.join(', ')}이(가) 읽지 말라고 선택했어요.`;
};

export const getEvaluationMessage = (item: string[]) => {
  if (item.length === 0) return null;

  const selectedParts = item.map(
    (part) => ExecutiveType[part as keyof typeof ExecutiveType],
  );

  return `${selectedParts.join(', ')}이(가) 평가를 완료했어요.`;
};
