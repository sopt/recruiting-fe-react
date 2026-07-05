type ApplicationDetailNavigationParams = {
  applicantIds?: number[];
  season?: number;
  group?: string;
  part?: string;
  offset?: number;
  limit?: number;
  total?: number;
  hideEvaluated?: boolean;
  checkInterviewPass?: boolean;
  passStatus?: string;
  searchKeyword?: string;
};

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
    ) => {
      const searchParams = new URLSearchParams({ id: String(id) });

      if (navigationParams?.applicantIds?.length) {
        searchParams.set('ids', navigationParams.applicantIds.join(','));
      }

      Object.entries({
        season: navigationParams?.season,
        group: navigationParams?.group,
        part: navigationParams?.part,
        offset: navigationParams?.offset,
        limit: navigationParams?.limit,
        total: navigationParams?.total,
        hideEvaluated: navigationParams?.hideEvaluated,
        checkInterviewPass: navigationParams?.checkInterviewPass,
        passStatus: navigationParams?.passStatus,
        searchKeyword: navigationParams?.searchKeyword,
      }).forEach(([key, value]) => {
        if (value !== undefined && value !== '') {
          searchParams.set(key, String(value));
        }
      });

      return `/application/detail?${searchParams.toString()}`;
    },
  },
  questionPreview: {
    title: '미리보기',
    path: '/preview-form',
  },
};
