import { useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ChevronDown } from '@/assets/svg';
import { useGetApplicantList } from '@/pages/Application/hooks/queries';
import {
  EMPTY_APPLICANT_LIST_PARAMS,
  getDetailNavigationState,
  getLastApplicantId,
} from '@/pages/Application/utils/navigationSearchParams';
import { ROUTES_CONFIG } from '@/routes/routeConfig';

const HeaderNavigation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const applicantId = Number(searchParams.get('id'));
  const { applicantIds, listParams, total } = useMemo(
    () => getDetailNavigationState(searchParams),
    [searchParams],
  );

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

  // 현재 URL의 지원자 ID 목록만으로 이전/다음 이동이 불가능한 경우 추가 조회
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

export default HeaderNavigation;
