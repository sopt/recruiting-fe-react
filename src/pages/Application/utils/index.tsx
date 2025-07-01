import type { ApplicationTableProps } from '@/pages/Application/\btypes';

export const getDoNotReadMessage = (item: ApplicationTableProps['data'][0]) => {
  if (item.dontReadInfo.checkedList.length === 0) return null;

  const selectedParts = Object.keys(item.dontReadInfo.checkedList).filter(
    (key) =>
      item.dontReadInfo.checkedList![
        key as keyof typeof item.dontReadInfo.checkedList
      ],
  );

  if (selectedParts.length === 0) return null;

  return `${selectedParts.join(', ')}이(가) 읽지 말라고 선택했어요.`;
};

export const getEvaluationMessage = (
  item: ApplicationTableProps['data'][0],
) => {
  if (item.evaluatedInfo.checkedList.length === 0) return null;

  const selectedParts = Object.keys(item.evaluatedInfo.checkedList).filter(
    (key) =>
      item.evaluatedInfo.checkedList![
        key as keyof typeof item.evaluatedInfo.checkedList
      ],
  );

  if (selectedParts.length === 0) return null;

  return `${selectedParts.join(', ')}이(가) 평가를 완료했어요.`;
};
