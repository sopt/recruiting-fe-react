import { useToast } from '@sopt-makers/ui';
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
import { postApplicantCsv } from '@/pages/Application/apis/postApplicantCsv';
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

export const useGetApplicantList = (
  params: GetApplicantListRequest,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: ApplicantKeys.filteredList(params),
    queryFn: () => getApplicantList(params),
    enabled: !!params.season && (options?.enabled ?? true),
  });
};

export const usePostApplicantCsv = () => {
  const { open } = useToast();

  return useMutation({
    mutationFn: postApplicantCsv,
    onSuccess: ({ blob, fileName }) => {
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      open({ icon: 'success', content: 'CSV 다운로드가 완료되었어요.' });
    },
    onError: () => {
      open({ icon: 'error', content: 'CSV 다운로드에 실패했어요.' });
    },
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

      const snapshotsData = queryClient.getQueriesData<CachedData>({
        queryKey: ApplicantKeys.list(),
      });

      const applyUpdate = (prev?: CachedData) => {
        if (!prev) return prev;
        const prevList = prev.data ?? [];

        const targetIndex = prevList.findIndex(
          (applicant) => applicant.id === evaluationInfo.applicantId,
        );

        if (
          targetIndex === -1 ||
          evaluationInfo.evaluationType !== 'EVALUATION'
        ) {
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
        queryClient.setQueryData<CachedData>(key, applyUpdate(prev));
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
