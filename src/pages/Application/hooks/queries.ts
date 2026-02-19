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
  type CachedData = GetApplicantListResponse['data'];

  return useMutation<
    unknown,
    unknown,
    PostEvaluationRequest,
    { snapshotsData: Array<[QueryKey, CachedData | undefined]> }
  >({
    mutationFn: (evaluationInfo: PostEvaluationRequest) =>
      postEvaluation(evaluationInfo),
    onMutate: async (evaluationInfo) => {
      await queryClient.cancelQueries({
        queryKey: ApplicantKeys.list(),
      });

      const snapshotsData =
        queryClient.getQueriesData<CachedData>({
          queryKey: ApplicantKeys.list(),
        });

      const applyUpdate = (prev?: CachedData) => {
        if (!prev) return prev;
        const prevList = prev.data ?? [];

        const targetIndex = prevList.findIndex(
          (applicant) => applicant.id === evaluationInfo.applicantId
        );

        if (targetIndex === -1 || evaluationInfo.evaluationType !== 'EVALUATION') {
          return prev;
        }

        const targetApplicant = prevList[targetIndex];
        const prevCheckedByMe = targetApplicant.evaluatedInfo.checkedByMe;

        let newCheckedList = [...targetApplicant.evaluatedInfo.checkedList];
        if (evaluationInfo.isChecked && !prevCheckedByMe) {
          newCheckedList = [...newCheckedList, 'pending'];
        } else if (!evaluationInfo.isChecked && prevCheckedByMe) {
          newCheckedList = newCheckedList.slice(0, -1);
        }

        const newList = [...prevList];
        newList[targetIndex] = {
          ...targetApplicant,
          evaluatedInfo: {
            checkedByMe: evaluationInfo.isChecked,
            checkedList: newCheckedList,
          },
        };

        return {
          ...prev,
          data: newList,
        };
      };

      snapshotsData.forEach(([key, prev]) => {
        queryClient.setQueryData<CachedData>(
          key,
          applyUpdate(prev)
        );
      });

      return { snapshotsData };
    },
    onError: (_err, _variables, context) => {
      const { snapshotsData } = context ?? {};
      snapshotsData?.forEach(([key, prev]) => {
        queryClient.setQueryData<CachedData>(key, prev);
      });
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ApplicantKeys.list(),
      });
    },
  });
};
