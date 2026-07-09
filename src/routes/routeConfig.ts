import type { ApplicationDetailNavigationParams } from '@/pages/Application/\btypes';
import { createApplicationDetailSearchParams } from '@/pages/Application/utils/navigationSearchParams';

export const ROUTES_CONFIG = {
  login: {
    title: '로그인',
    path: '/login',
  },
  postQuestion: {
    title: '질문 등록',
    path: '/post-question',
  },
  postGeneration: {
    title: '기수 등록',
    path: '/post-generation',
  },
  application: {
    title: '지원서 관리',
    path: '/application',
  },
  applicationDetail: {
    title: '지원서 관리',
    path: '/application/detail',
    generatePath: (
      id: number,
      navigationParams?: ApplicationDetailNavigationParams,
    ) =>
      `/application/detail?${createApplicationDetailSearchParams(
        id,
        navigationParams,
      ).toString()}`,
  },
  questionPreview: {
    title: '미리보기',
    path: '/preview-form',
  },
};
