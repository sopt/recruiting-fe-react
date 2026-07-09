import type {
  ApplicantState,
  ApplicationDetailNavigationParams,
  GetApplicantListRequest,
} from '@/pages/Application/\btypes';
import {
  APPLICATION_PAGE_LIMIT,
  COMMON_QUESTION,
} from '@/pages/Application/constants';

const APPLICATION_SEARCH_PARAM_KEYS = [
  'season',
  'group',
  'part',
  'hideEvaluated',
  'checkInterviewPass',
  'passStatus',
  'searchKeyword',
] as const;

export const EMPTY_APPLICANT_LIST_PARAMS: GetApplicantListRequest = {
  season: 0,
  group: 'YB',
  offset: 0,
  limit: APPLICATION_PAGE_LIMIT,
  hideEvaluated: false,
  checkInterviewPass: false,
  passStatus: '',
  searchKeyword: '',
};

export const getNumberParam = (value: string | null) => {
  if (value === null || value === '') return undefined;

  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : undefined;
};

export const getApplicantIdsFromSearchParams = (
  applicantIdsParam: string | null,
) => {
  if (!applicantIdsParam) return [];

  return applicantIdsParam
    .split(',')
    .map(Number)
    .filter((id): id is number => Number.isFinite(id));
};

export const getLastApplicantId = (applicantIds: number[]) =>
  applicantIds.length > 0 ? applicantIds[applicantIds.length - 1] : undefined;

export const getInitialPage = (searchParams: URLSearchParams) => {
  const page = getNumberParam(searchParams.get('page'));
  const offset = getNumberParam(searchParams.get('offset'));

  if (page && page > 0) return page;
  if (offset !== undefined && offset >= 0) {
    return Math.floor(offset / APPLICATION_PAGE_LIMIT) + 1;
  }

  return 1;
};

export const getInitialApplicantInfo = (
  searchParams: URLSearchParams,
  initialApplicantInfo: ApplicantState,
): ApplicantState => ({
  ...initialApplicantInfo,
  season: searchParams.get('season') ?? initialApplicantInfo.season,
  group:
    (searchParams.get('group') as ApplicantState['group'] | null) ??
    initialApplicantInfo.group,
  evaluatedInfo: {
    checkedByMe: searchParams.get('hideEvaluated') === 'true',
  },
  isPassedOnly: searchParams.get('checkInterviewPass') === 'true',
  selectedPart:
    (searchParams.get('part') as ApplicantState['selectedPart'] | null) ??
    initialApplicantInfo.selectedPart,
  passStatus: searchParams.get('passStatus') ?? initialApplicantInfo.passStatus,
  searchKeyword:
    searchParams.get('searchKeyword') ?? initialApplicantInfo.searchKeyword,
});

export const createApplicationSearchParams = ({
  applicantInfo,
  searchKeyword,
  currentPage,
}: {
  applicantInfo: ApplicantState;
  searchKeyword: string;
  currentPage: number;
}) => {
  const searchParams = new URLSearchParams();

  if (applicantInfo.season) {
    searchParams.set('season', applicantInfo.season);
  }
  searchParams.set('group', applicantInfo.group);
  if (applicantInfo.selectedPart !== COMMON_QUESTION) {
    searchParams.set('part', applicantInfo.selectedPart);
  }
  if (applicantInfo.evaluatedInfo.checkedByMe) {
    searchParams.set('hideEvaluated', 'true');
  }
  if (applicantInfo.isPassedOnly) {
    searchParams.set('checkInterviewPass', 'true');
  }
  if (applicantInfo.passStatus) {
    searchParams.set('passStatus', applicantInfo.passStatus);
  }
  if (searchKeyword) {
    searchParams.set('searchKeyword', searchKeyword);
  }
  if (currentPage > 1) {
    searchParams.set('page', String(currentPage));
  }

  return searchParams;
};

export const createApplicationSearchParamsFromDetail = (
  detailSearchParams: URLSearchParams,
) => {
  const applicationSearchParams = new URLSearchParams();
  const offset = getNumberParam(detailSearchParams.get('offset'));
  const limit = getNumberParam(detailSearchParams.get('limit'));

  APPLICATION_SEARCH_PARAM_KEYS.forEach((key) => {
    const value = detailSearchParams.get(key);

    if (value) {
      applicationSearchParams.set(key, value);
    }
  });

  if (offset !== undefined && limit && limit > 0) {
    const page = Math.floor(offset / limit) + 1;

    if (page > 1) {
      applicationSearchParams.set('page', String(page));
    }
  }

  return applicationSearchParams;
};

export const getDetailNavigationState = (searchParams: URLSearchParams) => {
  const applicantIds = getApplicantIdsFromSearchParams(searchParams.get('ids'));
  const season = getNumberParam(searchParams.get('season'));
  const group = searchParams.get('group');
  const offset = getNumberParam(searchParams.get('offset'));
  const limit = getNumberParam(searchParams.get('limit'));
  const total = getNumberParam(searchParams.get('total'));
  const part = searchParams.get('part');

  const listParams =
    season && group && offset !== undefined && limit
      ? {
          season,
          group: group as GetApplicantListRequest['group'],
          offset,
          limit,
          hideEvaluated: searchParams.get('hideEvaluated') === 'true',
          checkInterviewPass: searchParams.get('checkInterviewPass') === 'true',
          passStatus: searchParams.get('passStatus') ?? '',
          searchKeyword: searchParams.get('searchKeyword') ?? '',
          ...(part && { part: part as GetApplicantListRequest['part'] }),
        }
      : undefined;

  return {
    applicantIds,
    listParams,
    total: total ?? applicantIds.length,
  };
};

export const createApplicationDetailSearchParams = (
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

  return searchParams;
};
