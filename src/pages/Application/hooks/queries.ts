import type { QueryKey } from '@tanstack/react-query';
import { useMutation, useQuery } from '@tanstack/react-query';
import queryClient from '@/apis/queryClient';
import type {
  GetApplicantListRequest,
  GetApplicantListResponse,
  PostApplicantPassStatusRequest,
  PostEvaluationRequest,
} from '@/pages/Application/\btypes';
import { getApplicantList } from '@/pages/Application/apis/getApplicantList';
import { postEvaluation } from '@/pages/Application/apis/postEvaluation';
import { postPassStatus } from '@/pages/Application/apis/postPassStatus';

export const ApplicantKeys = {
  all: () => ['applicant'] as const,
  list: () => [...ApplicantKeys.all(), 'list'] as const,
  filteredList: (params: GetApplicantListRequest) =>
    [...ApplicantKeys.list(), params] as const,
  detail: (applicantId: number) =>
    [...ApplicantKeys.all(), 'detail', applicantId] as const,
} as const;

export const useGetApplicantList = (params: GetApplicantListRequest) => {
  return useQuery({
    queryKey: ApplicantKeys.filteredList(params),
    queryFn: () => getApplicantList(params),
    enabled: !!params.season,
  });
};

export const usePostApplicantPassStatus = () => {
  return useMutation({
    mutationFn: (info: PostApplicantPassStatusRequest) => postPassStatus(info),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ApplicantKeys.list(),
      });
    },
  });
};

export const usePostEvalution = () => {
  return useMutation<
    unknown,
    unknown,
    PostEvaluationRequest,
    { snapshotsData: Array<[QueryKey, GetApplicantListResponse | undefined]> }
  >({
    mutationFn: (evaluationInfo: PostEvaluationRequest) =>
      postEvaluation(evaluationInfo),
    onMutate: async (evaluationInfo) => {
      await queryClient.cancelQueries({
        queryKey: ApplicantKeys.list(),
      });

      const snapshotsData =
        queryClient.getQueriesData<GetApplicantListResponse>({
          queryKey: ApplicantKeys.list(),
        });

      const applyUpdate = (prev?: GetApplicantListResponse) => {
        if (!prev) return prev;
        const prevList = prev.data?.data ?? [];
        const newList = prevList.map((applicant) => {
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

        return {
          ...prev,
          data: {
            ...prev.data,
            data: newList,
          },
        };
      };

      snapshotsData.forEach(([key, prev]) => {
        queryClient.setQueryData<GetApplicantListResponse>(
          key,
          applyUpdate(prev)
        );
      });

      return { snapshotsData };
    },
    onError: (_err, _variables, context) => {
      const { snapshotsData } = context ?? {};
      snapshotsData?.forEach(([key, prev]) => {
        queryClient.setQueryData<GetApplicantListResponse>(key, prev);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ApplicantKeys.list(),
      });
    },
  });
};
