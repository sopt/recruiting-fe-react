import Pagination from '@/components/Pagination';
import usePagination from '@/hooks/usePagination';
import type { ApplicantState, PartType } from '@/pages/Application/\btypes';
import ApplicationTable from '@/pages/Application/components/ApplicationTable';
import Filter from '@/pages/Application/components/Filter';
import { PART_TRANSLATOR } from '@/pages/Application/constants';
import { useGetApplicantList } from '@/pages/Application/hooks/queries';
import { useGetGeneration } from '@/pages/PostGeneration/hooks/queries';
import { Tab } from '@sopt-makers/ui';
import { useMemo, useState } from 'react';

const LIST_LIMIT = 10;
const PAGE_LIMIT = 5;

const Application = () => {
  const [applicantInfo, setApplicantInfo] = useState<ApplicantState>({
    season: '',
    group: 'YB',
    isEvaluated: false,
    isDontRead: false,
    isPassedOnly: false,
    selectedPart: 'ALL',
  });

  const { data: generationData } = useGetGeneration(applicantInfo.group);

  const defaultSeason = generationData?.seasons[0]?.season.toString() ?? '';

  if (!applicantInfo.season && defaultSeason) {
    setApplicantInfo((prev) => ({ ...prev, season: defaultSeason }));
  }

  const { data, refetch } = useGetApplicantList({
    season: Number(applicantInfo.season),
    group: applicantInfo.group,
    part: applicantInfo.selectedPart,
    offset: 0,
    limit: LIST_LIMIT,
    minRate: 0,
    hideEvaluated: applicantInfo.isEvaluated,
    hideDontRead: applicantInfo.isDontRead,
    checkInterviewPass: applicantInfo.isPassedOnly,
  });

  const { currentPage, totalPages, handlePageChange } = usePagination({
    totalItems: data?.data.length ?? 0,
    limit: PAGE_LIMIT,
  });

  const paginatedData = useMemo(() => {
    const arr = Array.isArray(data?.data) ? data.data : [];
    const startIndex = (currentPage - 1) * PAGE_LIMIT;
    const endIndex = startIndex + PAGE_LIMIT;

    return arr.slice(startIndex, endIndex);
  }, [currentPage, data?.data]);

  return (
    <div className="flex flex-col gap-[4.4rem]">
      <Filter
        generationData={generationData}
        applicantInfo={applicantInfo}
        setApplicantInfo={setApplicantInfo}
        onRefresh={refetch}
      />
      <Tab
        style="primary"
        size="md"
        tabItems={Object.keys(PART_TRANSLATOR) as PartType[]}
        translator={PART_TRANSLATOR}
        onChange={(selectedPart) =>
          setApplicantInfo((prev) => ({ ...prev, selectedPart }))
        }
      />
      <hr className="border-gray800 mt-[-4.7rem] w-[98rem]" />
      <ApplicationTable data={paginatedData} />
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default Application;
