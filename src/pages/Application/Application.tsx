import { Button, Tab } from '@sopt-makers/ui';
import { useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Pagination from '@/components/Pagination';
import { IS_SOPT } from '@/constants';
import { useNav } from '@/contexts/NavContext';
import { useDebouncedCallback } from '@/hooks/useDebounceCallback';
import {
  type ApplicantState,
  Part,
  type PartType,
  type PassInfo,
  SoptPart,
  type SoptPartType,
} from '@/pages/Application/\btypes';
import ApplicationTable from '@/pages/Application/components/ApplicationTable';
import Filter from '@/pages/Application/components/Filter';
import {
  APPLICATION_PAGE_LIMIT,
  COMMON_QUESTION,
} from '@/pages/Application/constants';
import {
  useGetApplicantList,
  usePostApplicantCsv,
} from '@/pages/Application/hooks/queries';

import {
  createApplicationListSearchParams,
  getInitialApplicantInfoFromSearchParams,
  getInitialApplicationPage,
} from '@/pages/Application/utils/navigationSearchParams';

import { useGetGeneration } from '@/pages/PostGeneration/hooks/queries';

const INITIAL_APPLICANT_INFO: ApplicantState = {
  season: '',
  group: 'YB',
  evaluatedInfo: {
    checkedByMe: false,
  },
  isPassedOnly: false,
  selectedPart: COMMON_QUESTION,
  passStatus: '',
  searchKeyword: '',
  sortBy: 'SUBMISSION_AT',
};

const tabItems = IS_SOPT
  ? (Object.keys(SoptPart) as SoptPartType[])
  : (Object.keys(Part) as PartType[]);

const Application = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const didMountRef = useRef(false);

  const initialSearchKeyword = searchParams.get('searchKeyword') ?? '';

  const [applicantInfo, setApplicantInfo] = useState<ApplicantState>(() =>
    getInitialApplicantInfoFromSearchParams(
      searchParams,
      INITIAL_APPLICANT_INFO,
    ),
  );
  const [currentPage, setCurrentPage] = useState(() =>
    getInitialApplicationPage(searchParams),
  );
  const [searchInputValue, setSearchInputValue] =
    useState(initialSearchKeyword);
  const [searchApplicantValue, setSearchApplicantValue] =
    useState(initialSearchKeyword);

  const { isOpen } = useNav();

  const handleFilterChange: typeof setApplicantInfo = (info) => {
    setCurrentPage(1);
    setApplicantInfo(info);
  };

  const { data: generationData } = useGetGeneration(applicantInfo.group);

  const applicantListParams = {
    season: Number(applicantInfo.season),
    group: applicantInfo.group,
    offset: (currentPage - 1) * APPLICATION_PAGE_LIMIT,
    limit: APPLICATION_PAGE_LIMIT,
    hideEvaluated: applicantInfo.evaluatedInfo.checkedByMe,
    checkInterviewPass: applicantInfo.isPassedOnly,
    passStatus: applicantInfo.passStatus,
    searchKeyword: searchApplicantValue,
    sortBy: applicantInfo.sortBy,
    ...(applicantInfo.selectedPart !== COMMON_QUESTION && {
      part: applicantInfo.selectedPart,
    }),
  };

  const { data: applicantList, isLoading } =
    useGetApplicantList(applicantListParams);
  const { mutate: postApplicantCsv, isPending: isCsvDownloading } =
    usePostApplicantCsv();

  const totalPages =
    applicantList?.meta?.totalPage ??
    Math.ceil((applicantList?.meta?.total ?? 0) / APPLICATION_PAGE_LIMIT);

  const debouncedSetSearchValue = useDebouncedCallback((value) => {
    if (typeof value === 'string') {
      setSearchApplicantValue(value);
    }
  }, 200);

  const handleCsvDownload = () => {
    postApplicantCsv({
      season: Number(applicantInfo.season),
      group: applicantInfo.group,
      hideEvaluated: applicantInfo.evaluatedInfo.checkedByMe,
      hideDontRead: applicantInfo.isPassedOnly,
      passStatusFilters: applicantInfo.passStatus
        ? applicantInfo.passStatus
            .split(',')
            .filter((status): status is PassInfo => Boolean(status))
        : [],
      searchKeyword: searchInputValue.trim(),
      sortBy: applicantInfo.sortBy,
      ...(applicantInfo.selectedPart !== COMMON_QUESTION && {
        part: applicantInfo.selectedPart,
      }),
    });
  };

  useEffect(() => {
    debouncedSetSearchValue(searchInputValue);
  }, [searchInputValue, debouncedSetSearchValue]);

  useEffect(() => {
    if (generationData.seasons.length === 0) return;

    setApplicantInfo((prev) => {
      const defaultSeason = generationData.seasons[0].season.toString();
      const seasonExists = prev.season
        ? generationData.seasons.some(
            (s) => s.season.toString() === prev.season,
          )
        : false;

      return {
        ...prev,
        season: prev.season && seasonExists ? prev.season : defaultSeason,
      };
    });
  }, [generationData, applicantInfo.group]);

  useEffect(() => {
    if (!didMountRef.current) {
      didMountRef.current = true;
      return;
    }

    setCurrentPage(1);
  }, [
    applicantInfo.season,
    applicantInfo.group,
    applicantInfo.evaluatedInfo.checkedByMe,
    applicantInfo.isPassedOnly,
    applicantInfo.selectedPart,
    applicantInfo.passStatus,
    applicantInfo.sortBy,
    searchApplicantValue,
  ]);

  useEffect(() => {
    const nextSearchParams = createApplicationListSearchParams({
      applicantInfo,
      searchKeyword: searchApplicantValue,
      currentPage,
    });

    if (nextSearchParams.toString() !== searchParams.toString()) {
      setSearchParams(nextSearchParams, { replace: true });
    }
  }, [
    applicantInfo.season,
    applicantInfo.group,
    applicantInfo.selectedPart,
    applicantInfo.evaluatedInfo.checkedByMe,
    applicantInfo.isPassedOnly,
    applicantInfo.passStatus,
    applicantInfo.sortBy,
    searchApplicantValue,
    currentPage,
    searchParams,
    setSearchParams,
  ]);

  return (
    <>
      <div className="flex flex-col gap-[4.4rem] overflow-hidden">
        <div
          className={`relative flex flex-col gap-[4.4rem] justify-between pr-[12.4rem] transition-all duration-300 ${
            isOpen ? 'pl-[21.2rem]' : 'pl-[12.4rem]'
          }`}
        >
          <Filter
            generationData={generationData}
            applicantInfo={applicantInfo}
            searchApplicantValue={searchInputValue}
            setApplicantInfo={handleFilterChange}
            onSearchChange={(value) => {
              setSearchInputValue(value);
            }}
          />

          <div className="relative flex flex-col gap-[0.8rem]">
            <Tab
              style="primary"
              size="md"
              tabItems={tabItems}
              onChange={(selectedPart) => {
                setApplicantInfo((prev) => ({ ...prev, selectedPart }));
                setCurrentPage(1);
              }}
            />
            <hr
              className={
                'border-gray800 w-[98rem] mt-[-1rem] transition-all duration-300'
              }
            />
          </div>
          <div className="absolute right-[6.9rem] top-[21rem]">
            <Button
              theme="black"
              size="md"
              onClick={handleCsvDownload}
              disabled={isCsvDownloading || !applicantInfo.season}
            >
              CSV 다운로드
            </Button>
          </div>
        </div>

        <ApplicationTable
          navigationParams={
            applicantList
              ? { ...applicantListParams, total: applicantList.meta.total }
              : null
          }
          data={
            applicantList ?? {
              data: [],
              meta: {
                total: 0,
                totalPage: 0,
                currentPage: 1,
                limit: 10,
                offset: 0,
              },
            }
          }
          isLoading={isLoading}
        />
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </>
  );
};

export default Application;
