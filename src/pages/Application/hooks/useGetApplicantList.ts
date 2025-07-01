import type { GetApplicantListRequest } from '@/pages/Application/\btypes';
import { getApplicantList } from '@/pages/Application/apis/getApplicantList';
import { useQuery } from '@tanstack/react-query';

const QUERY_KEY = {
  APPLICANT_LIST: 'APPLICANT_LIST',
};

export const useGetApplicantList = (params: GetApplicantListRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY.APPLICANT_LIST],
    queryFn: () => getApplicantList(params),
  });
};
