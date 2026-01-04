import type { StatusType } from '@/pages/Application/\btypes';
import { ROUTES_CONFIG } from '@/routes/routeConfig';

export const convertStatusToPassInfo = (
  status: StatusType
): { applicationPass: boolean | null; finalPass: boolean | null } => {
  switch (status) {
    case '확인 전':
      return { applicationPass: null, finalPass: null };
    case '서류 합격':
      return { applicationPass: true, finalPass: null };
    case '불합격':
      return { applicationPass: false, finalPass: false };
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

// export const getPartName = (part: PartType) => {
//   switch (part) {
//     case '기획':
//       return '기획';
//     case '디자인':
//       return '디자인';
//     case 'ios':
//       return 'iOS';
//     case '웹':
//       return '웹';
//     case '안드로이드':
//       return '안드로이드';
//     case '서버':
//       return '서버';
//     default:
//       return '전체';
//   }
// };

export const goApplicationDetail = (applicantId: number) => {
  const path = ROUTES_CONFIG.applicationDetail.generatePath(applicantId);
  const url = `${window.location.origin}${
    path.startsWith('/') ? '' : '/'
  }${path}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};
