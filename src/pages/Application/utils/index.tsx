import type { PartType, StatusType } from '@/pages/Application/\btypes';

enum ExecutiveType {
  PRESIDENT = '회장',
  VICE_PRESIDENT = '부회장',
  MEDIA = '미디어',
  PLAN = '기획',
  DESIGN = '디자인',
  SERVER = '서버',
  WEB = '웹',
  IOS = 'iOS',
  ANDROID = '안드로이드',
}

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

export const convertPassInfoToStatus = (passInfo: string) => {
  switch (passInfo) {
    case 'FINAL_PASS':
      return '최종 합격';
    case 'FAIL':
      return '불합격';
    case 'NOT_EVALUATED':
      return '확인 전';
    case 'INTERVIEW_PASS':
      return '서류 합격';
    default:
      return '확인 전';
  }
};

export const getPartName = (part: PartType) => {
  switch (part) {
    case 'PLAN':
      return '기획';
    case 'DESIGN':
      return '디자인';
    case 'IOS':
      return 'iOS';
    case 'WEB':
      return '웹';
    case 'ANDROID':
      return '안드로이드';
    case 'SERVER':
      return '서버';
    default:
      return '전체';
  }
};
