import { getApplicationDetail } from '@/pages/ApplicationDetail/apis/getApplicationDetail';
import { useQuery } from '@tanstack/react-query';

export const useGetApplicantDetail = (applicantId: number) => {
  return useQuery({
    queryKey: ['applicant', 'detail', applicantId],
    queryFn: () => getApplicationDetail(applicantId),
  });
};
