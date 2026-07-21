import type React from 'react';
import type {
  ApplicationDetailNavigationParams,
  StatusType,
} from '@/pages/Application/\btypes';
import { ROUTES_CONFIG } from '@/routes/routeConfig';

export const convertStatusToPassInfo = (
  status: StatusType,
): { applicationPass: boolean | null; finalPass: boolean | null } => {
  switch (status) {
    case '서류 불합격':
      return { applicationPass: false, finalPass: false };
    case '서류 합격':
      return { applicationPass: true, finalPass: null };
    case '최종 불합격':
      return { applicationPass: true, finalPass: false };
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
    case 'FINAL_FAIL':
      return '최종 불합격';
    case 'DOCUMENT_FAIL':
      return '서류 불합격';
    case 'DOCUMENT_PASS':
      return '서류 합격';
    default:
      return '서류 불합격';
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

export const goApplicationDetail = (
  applicantId: number,
  navigationParams?: ApplicationDetailNavigationParams,
) => {
  const path = ROUTES_CONFIG.applicationDetail.generatePath(
    applicantId,
    navigationParams,
  );
  const url = `${window.location.origin}${
    path.startsWith('/') ? '' : '/'
  }${path}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

export const stopEventPropagationOnKey = (
  e: React.KeyboardEvent,
  keys: string[],
) => {
  if (keys.includes(e.key)) {
    e.stopPropagation();
  }
};
