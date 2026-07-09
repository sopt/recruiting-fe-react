import type {
  ApplicantState,
  ApplicationDetailNavigationParams,
  GetApplicantListRequest,
} from '@/pages/Application/\btypes';
import {
  APPLICATION_PAGE_LIMIT,
  COMMON_QUESTION,
} from '@/pages/Application/constants';

const APPLICATION_LIST_FILTER_PARAM_KEYS = [
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

type OptionalSearchParamValue = string | number | boolean | null | undefined;
type SearchParamRecord = Record<string, OptionalSearchParamValue>;

const setOptionalSearchParam = (
  searchParams: URLSearchParams,
  key: string,
  value: OptionalSearchParamValue,
) => {
  if (value !== undefined && value !== null && value !== '') {
    searchParams.set(key, String(value));
  }
};

const setOptionalSearchParams = (
  searchParams: URLSearchParams,
  params: SearchParamRecord,
) => {
  Object.entries(params).forEach(([key, value]) => {
    setOptionalSearchParam(searchParams, key, value);
  });
};

const copySearchParams = (
  sourceSearchParams: URLSearchParams,
  targetSearchParams: URLSearchParams,
  keys: readonly string[],
) => {
  keys.forEach((key) => {
    setOptionalSearchParam(
      targetSearchParams,
      key,
      sourceSearchParams.get(key),
    );
  });
};

export const parseNumberSearchParam = (value: string | null) => {
  if (value === null || value === '') return undefined;

  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : undefined;
};

export const parseApplicantIdsSearchParam = (
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

const getPageFromOffset = (offset?: number, limit?: number) => {
  if (offset === undefined || offset < 0 || limit === undefined || limit <= 0) {
    return undefined;
  }

  return Math.floor(offset / limit) + 1;
};

const createListParamsFromDetailSearchParams = (
  searchParams: URLSearchParams,
): GetApplicantListRequest | undefined => {
  const season = parseNumberSearchParam(searchParams.get('season'));
  const group = searchParams.get('group');
  const offset = parseNumberSearchParam(searchParams.get('offset'));
  const limit = parseNumberSearchParam(searchParams.get('limit'));
  const part = searchParams.get('part');

  if (!season || !group || offset === undefined || !limit) return undefined;

  return {
    season,
    group: group as GetApplicantListRequest['group'],
    offset,
    limit,
    hideEvaluated: searchParams.get('hideEvaluated') === 'true',
    checkInterviewPass: searchParams.get('checkInterviewPass') === 'true',
    passStatus: searchParams.get('passStatus') ?? '',
    searchKeyword: searchParams.get('searchKeyword') ?? '',
    ...(part && { part: part as GetApplicantListRequest['part'] }),
  };
};

export const getInitialApplicationPage = (searchParams: URLSearchParams) => {
  const page = parseNumberSearchParam(searchParams.get('page'));
  const offset = parseNumberSearchParam(searchParams.get('offset'));

  if (page && page > 0) return page;

  return getPageFromOffset(offset, APPLICATION_PAGE_LIMIT) ?? 1;
};

export const getInitialApplicantInfoFromSearchParams = (
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

export const createApplicationListSearchParams = ({
  applicantInfo,
  searchKeyword,
  currentPage,
}: {
  applicantInfo: ApplicantState;
  searchKeyword: string;
  currentPage: number;
}) => {
  const searchParams = new URLSearchParams();

  setOptionalSearchParams(searchParams, {
    season: applicantInfo.season,
    group: applicantInfo.group,
    part:
      applicantInfo.selectedPart === COMMON_QUESTION
        ? undefined
        : applicantInfo.selectedPart,
    hideEvaluated: applicantInfo.evaluatedInfo.checkedByMe ? true : undefined,
    checkInterviewPass: applicantInfo.isPassedOnly ? true : undefined,
    passStatus: applicantInfo.passStatus,
    searchKeyword,
    page: currentPage > 1 ? currentPage : undefined,
  });

  return searchParams;
};

export const createApplicationListSearchParamsFromDetail = (
  detailSearchParams: URLSearchParams,
) => {
  const applicationSearchParams = new URLSearchParams();
  const offset = parseNumberSearchParam(detailSearchParams.get('offset'));
  const limit = parseNumberSearchParam(detailSearchParams.get('limit'));
  const page = getPageFromOffset(offset, limit);

  copySearchParams(
    detailSearchParams,
    applicationSearchParams,
    APPLICATION_LIST_FILTER_PARAM_KEYS,
  );

  // 지원자 목록 페이지 페이지네이션 번호 설정 (상세 페이지에서 목록 페이지로 돌아갈 때 사용)
  if (page && page > 1) {
    applicationSearchParams.set('page', String(page));
  }

  return applicationSearchParams;
};

export const getDetailNavigationState = (searchParams: URLSearchParams) => {
  const applicantIds = parseApplicantIdsSearchParam(searchParams.get('ids'));
  const total = parseNumberSearchParam(searchParams.get('total'));

  return {
    applicantIds,
    listParams: createListParamsFromDetailSearchParams(searchParams),
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

  setOptionalSearchParams(searchParams, {
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
  });

  return searchParams;
};
