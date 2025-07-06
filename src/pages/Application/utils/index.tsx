import type {
  ApplicationTableProps,
  StatusType,
} from '@/pages/Application/\btypes';

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

export const convertStatusToPassInfo = (
  status: StatusType,
): { applicationPass: boolean | null; finalPass: boolean | null } => {
  switch (status) {
    case '확인 전':
      return { applicationPass: null, finalPass: null };
    case '서류 합격':
      return { applicationPass: true, finalPass: null };
    case '불합격':
      return { applicationPass: false, finalPass: null };
    case '최종 합격':
      return { applicationPass: true, finalPass: true };
    default:
      return { applicationPass: null, finalPass: null };
  }
};

export const isNumberValue = (value: string): boolean => {
  // biome-ignore lint/performance/useTopLevelRegex: 숫자 형식 검사
  return value === '' || /^\d*\.?\d*$/.test(value);
};
