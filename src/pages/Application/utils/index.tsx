import type { ApplicationTableProps } from '@/pages/Application/\btypes';

export const getDoNotReadMessage = (item: ApplicationTableProps['data'][0]) => {
  if (!item.doNotReadBy) return null;

  const selectedParts = Object.keys(item.doNotReadBy).filter(
    (key) => item.doNotReadBy![key as keyof typeof item.doNotReadBy],
  );

  if (selectedParts.length === 0) return null;

  return `${selectedParts.join(', ')}이(가) 읽지 말라고 선택했어요.`;
};

export const getEvaluationMessage = (
  item: ApplicationTableProps['data'][0],
) => {
  if (!item.evaluatedBy) return null;

  const selectedParts = Object.keys(item.evaluatedBy).filter(
    (key) => item.evaluatedBy![key as keyof typeof item.evaluatedBy],
  );

  if (selectedParts.length === 0) return null;

  return `${selectedParts.join(', ')}이(가) 평가를 완료했어요.`;
};
