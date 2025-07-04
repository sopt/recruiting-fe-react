import { getApplicantDetail } from '@/pages/ApplicationDetail/apis/getApplicantDetail';
import { useQuery } from '@tanstack/react-query';

export const useGetApplicantDetail = (applicantId: number) => {
  return useQuery({
    queryKey: ['applicant', 'detail', applicantId],
    queryFn: () => getApplicantDetail(applicantId),
  });
};
