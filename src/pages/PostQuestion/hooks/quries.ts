import { getQuestionList } from '@/pages/PostQuestion/apis/getQuestionList';
import { postQuestionsSave } from '@/pages/PostQuestion/apis/postQuestionsSave';
import type { GROUP, QuestionSubmitRequest } from '@/pages/PostQuestion/types';
import { useToast } from '@sopt-makers/ui';
import { useMutation, useQuery } from '@tanstack/react-query';

export const usePostQuestionsSave = () => {
  const { open } = useToast();
  return useMutation({
    mutationFn: (data: QuestionSubmitRequest) => postQuestionsSave(data),
    onSuccess: () =>
      open({ icon: 'success', content: '임시저장이 완료되었어요.' }),
  });
};

export const useGetQuestionList = (season: number, group: GROUP) => {
  return useQuery({
    queryKey: ['question', 'list', season, group],
    queryFn: () => getQuestionList(season, group),
  });
};
