import type {
  GetApplicantListRequest,
  PostApplicantPassStatusRequest,
} from '@/pages/Application/\btypes';
import { getApplicantList } from '@/pages/Application/apis/getApplicantList';
import { postPassStatus } from '@/pages/Application/apis/postPassStatus';
import { useMutation, useQuery } from '@tanstack/react-query';

const QUERY_KEY = {
  APPLICANT_LIST: 'APPLICANT_LIST',
};

export const useGetApplicantList = (params: GetApplicantListRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY.APPLICANT_LIST],
    queryFn: () => getApplicantList(params),
  });
};

export const usePostApplicantPassStatus = (
  info: PostApplicantPassStatusRequest,
) => {
  return useMutation({
    mutationFn: () => postPassStatus(info),
  });
};
