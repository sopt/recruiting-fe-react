import { useMutation, useQuery } from '@tanstack/react-query';
import queryClient from '@/apis/queryClient';
import { QUERY_KEY } from '@/apis/queryKey';
import type {
  GetApplicantListRequest,
  GetApplicantListResponse,
  PartType,
  PostApplicantPassStatusRequest,
  PostEvaluationRequest,
  SoptPartType,
} from '@/pages/Application/\btypes';
import { getApplicantList } from '@/pages/Application/apis/getApplicantList';
import { postEvaluation } from '@/pages/Application/apis/postEvaluation';
import { postMinRate } from '@/pages/Application/apis/postMinRate';
import { postPassStatus } from '@/pages/Application/apis/postPassStatus';
import type { Group } from '@/pages/PostQuestion/types';

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
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.APPLICANT_LIST],
      });
    },
  });
};

export const usePostEvalution = () => {
  return useMutation({
    mutationFn: (evaluationInfo: PostEvaluationRequest) =>
      postEvaluation(evaluationInfo),
    onMutate: async (evaluationInfo) => {
      await queryClient.cancelQueries({ queryKey: [QUERY_KEY.APPLICANT_LIST] });

      const previous = queryClient.getQueryData([
        QUERY_KEY.APPLICANT_LIST,
      ]) as GetApplicantListResponse;

      if (!previous) return;

      const prevList = previous?.data?.data ?? [];
      const newList = prevList.map((applicant) => {
        if (evaluationInfo.evaluationType === 'DONT_READ') {
          return {
            ...applicant,
            dontReadInfo: {
              ...applicant.dontReadInfo,
              checkedByMe: evaluationInfo.isChecked,
            },
          };
        }
        if (evaluationInfo.evaluationType === 'EVALUATION') {
          return {
            ...applicant,
            evaluatedInfo: {
              ...applicant.evaluatedInfo,
              checkedByMe: evaluationInfo.isChecked,
            },
          };
        }
        return applicant;
      });

      queryClient.setQueryData([QUERY_KEY.APPLICANT_LIST], {
        ...previous,
        data: {
          ...previous.data,
          data: newList,
        },
      });

      return { previous };
    },
    onError: (_, __, context) => {
      queryClient.setQueryData([QUERY_KEY.APPLICANT_LIST], context);
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.APPLICANT_LIST],
      });
    },
  });
};

export const usePostMinRate = () => {
  return useMutation({
    mutationFn: (info: {
      minimumRate: number;
      season: number;
      group: Group;
      selectedPart: PartType | SoptPartType;
    }) =>
      postMinRate(info.minimumRate, info.season, info.group, info.selectedPart),
  });
};
