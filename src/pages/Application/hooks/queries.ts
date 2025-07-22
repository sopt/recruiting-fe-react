import queryClient from '@/apis/queryClient';
import { QUERY_KEY } from '@/apis/queryKey';
import type {
  GetApplicantListRequest,
  PartType,
  PostApplicantPassStatusRequest,
  PostEvaluationRequest,
} from '@/pages/Application/\btypes';
import { getApplicantList } from '@/pages/Application/apis/getApplicantList';
import { postEvaluation } from '@/pages/Application/apis/postEvaluation';
import { postMinRate } from '@/pages/Application/apis/postMinRate';
import { postPassStatus } from '@/pages/Application/apis/postPassStatus';
import type { Group } from '@/pages/PostQuestion/types';

import { useMutation, useQuery } from '@tanstack/react-query';

export const useGetApplicantList = (params: GetApplicantListRequest) => {
  return useQuery({
    queryKey: [QUERY_KEY.APPLICANT_LIST, params],
    queryFn: () => getApplicantList(params),
    enabled: !!params.season,
  });
};

export const usePostApplicantPassStatus = () => {
  return useMutation({
    mutationFn: (info: PostApplicantPassStatusRequest) => postPassStatus(info),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.APPLICANT_LIST] });
    },
  });
};

export const usePostEvalution = () => {
  return useMutation({
    mutationFn: (evaluationInfo: PostEvaluationRequest) =>
      postEvaluation(evaluationInfo),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.APPLICANT_LIST] });
    },
  });
};

export const usePostMinRate = () => {
  return useMutation({
    mutationFn: (info: {
      minimumRate: number;
      season: number;
      group: Group;
      selectedPart: PartType;
    }) =>
      postMinRate(info.minimumRate, info.season, info.group, info.selectedPart),
  });
};
