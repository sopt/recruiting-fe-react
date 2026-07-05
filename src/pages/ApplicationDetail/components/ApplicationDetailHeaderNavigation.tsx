import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronDown } from '@/assets/svg';
import type { GetApplicantListRequest } from '@/pages/Application/\btypes';
import { useGetApplicantList } from '@/pages/Application/hooks/queries';
import { ROUTES_CONFIG } from '@/routes/routeConfig';

const EMPTY_APPLICANT_LIST_PARAMS: GetApplicantListRequest = {
  season: 0,
  group: 'YB',
  offset: 0,
  limit: 10,
  hideEvaluated: false,
  checkInterviewPass: false,
  passStatus: '',
  searchKeyword: '',
};

const getNumberParam = (value: string | null) => {
  const numberValue = Number(value);

  return Number.isFinite(numberValue) ? numberValue : undefined;
};

const getNavigationApplicantIds = (applicantIdsParam: string | null) => {
  if (!applicantIdsParam) return [];

  return applicantIdsParam
    .split(',')
    .map(Number)
    .filter((id): id is number => Number.isFinite(id));
};

const getLastApplicantId = (applicantIds: number[]) =>
  applicantIds.length > 0 ? applicantIds[applicantIds.length - 1] : undefined;

const ApplicationDetailHeaderNavigation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const applicantId = Number(searchParams.get('id'));
  const navigationState = useMemo(() => {
    const applicantIds = getNavigationApplicantIds(searchParams.get('ids'));
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
            checkInterviewPass:
              searchParams.get('checkInterviewPass') === 'true',
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
  }, [searchParams]);

  const { applicantIds, listParams, total } = navigationState;

  const { previousApplicantId, nextApplicantId, currentIndex } = useMemo(() => {
    const currentIndex = applicantIds.findIndex((id) => id === applicantId);

    return {
      currentIndex,
      previousApplicantId:
        currentIndex > 0 ? applicantIds[currentIndex - 1] : undefined,
      nextApplicantId:
        currentIndex >= 0 && currentIndex < applicantIds.length - 1
          ? applicantIds[currentIndex + 1]
          : undefined,
    };
  }, [applicantId, applicantIds]);

  const previousPageParams = listParams
    ? {
        ...listParams,
        offset: Math.max(0, listParams.offset - listParams.limit),
      }
    : EMPTY_APPLICANT_LIST_PARAMS;
  const nextPageParams = listParams
    ? { ...listParams, offset: listParams.offset + listParams.limit }
    : EMPTY_APPLICANT_LIST_PARAMS;

  const shouldFetchPreviousPage =
    !!listParams &&
    !previousApplicantId &&
    currentIndex === 0 &&
    listParams.offset > 0;
  const shouldFetchNextPage =
    !!listParams &&
    !nextApplicantId &&
    currentIndex === applicantIds.length - 1 &&
    listParams.offset + listParams.limit < total;

  const { data: previousPageData } = useGetApplicantList(previousPageParams, {
    enabled: shouldFetchPreviousPage,
  });
  const { data: nextPageData } = useGetApplicantList(nextPageParams, {
    enabled: shouldFetchNextPage,
  });

  const previousPageApplicantIds = useMemo(
    () => previousPageData?.data.map((applicant) => applicant.id) ?? [],
    [previousPageData],
  );
  const nextPageApplicantIds = useMemo(
    () => nextPageData?.data.map((applicant) => applicant.id) ?? [],
    [nextPageData],
  );

  const previousPageApplicantId = getLastApplicantId(previousPageApplicantIds);
  const nextPageApplicantId = nextPageApplicantIds[0];
  const resolvedPreviousApplicantId =
    previousApplicantId ?? previousPageApplicantId;
  const resolvedNextApplicantId = nextApplicantId ?? nextPageApplicantId;

  const moveApplicantDetail = (
    targetApplicantId?: number,
    nextApplicantIds = applicantIds,
    nextListParams = listParams,
  ) => {
    if (!targetApplicantId) return;

    navigate(
      ROUTES_CONFIG.applicationDetail.generatePath(targetApplicantId, {
        applicantIds: nextApplicantIds,
        ...nextListParams,
        total,
      }),
    );
  };

  return (
    <div className="flex items-center gap-[2.4rem]">
      <h1 className="title_1_32_sb text-gray10 whitespace-nowrap">
        {ROUTES_CONFIG.applicationDetail.title}
      </h1>
      <div className="flex items-center gap-[1.2rem]">
        <button
          type="button"
          aria-label="이전 지원서로 이동"
          disabled={!resolvedPreviousApplicantId}
          onClick={() => {
            if (previousApplicantId) {
              moveApplicantDetail(previousApplicantId);
              return;
            }

            moveApplicantDetail(
              previousPageApplicantId,
              previousPageApplicantIds,
              previousPageParams,
            );
          }}
          className="flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronDown className="w-[4.5rem] h-[4.5rem] rotate-180 text-white" />
        </button>
        <button
          type="button"
          aria-label="다음 지원서로 이동"
          disabled={!resolvedNextApplicantId}
          onClick={() => {
            if (nextApplicantId) {
              moveApplicantDetail(nextApplicantId);
              return;
            }

            moveApplicantDetail(
              nextPageApplicantId,
              nextPageApplicantIds,
              nextPageParams,
            );
          }}
          className="flex items-center justify-center cursor-pointer disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ChevronDown className="w-[4.5rem] h-[4.5rem] text-white" />
        </button>
      </div>
    </div>
  );
};

export default ApplicationDetailHeaderNavigation;
