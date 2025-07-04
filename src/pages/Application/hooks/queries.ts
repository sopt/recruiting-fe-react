import type {
  GetApplicantListRequest,
  PostApplicantPassStatusRequest,
  PostEvaluationRequest,
} from '@/pages/Application/\btypes';
import { getApplicantList } from '@/pages/Application/apis/getApplicantList';
import { postEvaluation } from '@/pages/Application/apis/postEvaluation';
import { postPassStatus } from '@/pages/Application/apis/postPassStatus';
import { useMutation, useQuery } from '@tanstack/react-query';

const QUERY_KEY = {
  APPLICANT_LIST: 'APPLICANT_LIST',
};

export const useGetApplicantList = (params: GetApplicantListRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY.APPLICANT_LIST, params],
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

export const usePostEvalution = () => {
  return useMutation({
    mutationFn: (evaluationInfo: PostEvaluationRequest) =>
      postEvaluation(evaluationInfo),
    onSuccess: () => {},
  });
};
