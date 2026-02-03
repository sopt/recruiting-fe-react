import { useSuspenseQuery } from '@tanstack/react-query';
import { ApplicantKeys } from '@/pages/Application/hooks/queries';
import { getApplicationDetail } from '@/pages/ApplicationDetail/apis/getApplicationDetail';

export const useGetApplicantDetail = (applicantId: number) => {
  return useSuspenseQuery({
    queryKey: ApplicantKeys.detail(applicantId),
    queryFn: () => getApplicationDetail(applicantId),
  });
};
