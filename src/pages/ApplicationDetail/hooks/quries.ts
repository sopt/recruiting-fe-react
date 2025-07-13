import { getApplicationDetail } from '@/pages/ApplicationDetail/apis/getApplicationDetail';
import { useSuspenseQuery } from '@tanstack/react-query';

export const useGetApplicantDetail = (applicantId: number) => {
  return useSuspenseQuery({
    queryKey: ['applicant', 'detail', applicantId],
    queryFn: () => getApplicationDetail(applicantId),
  });
};
