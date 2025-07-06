import { getQuestionList } from '@/pages/PostQuestion/apis/getQuestionList';
import { postQuestionsSave } from '@/pages/PostQuestion/apis/postQuestionsSave';
import type { GROUP, QuestionSubmitRequest } from '@/pages/PostQuestion/types';
import { useMutation, useQuery } from '@tanstack/react-query';

export const usePostQuestionsSave = () => {
  return useMutation({
    mutationFn: (data: QuestionSubmitRequest) => postQuestionsSave(data),
  });
};

export const useGetQuestionList = (season: number, group: GROUP) => {
  return useQuery({
    queryKey: ['question', 'list', season, group],
    queryFn: () => getQuestionList(season, group),
  });
};
