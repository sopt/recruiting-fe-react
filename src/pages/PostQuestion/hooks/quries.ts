import { useToast } from '@sopt-makers/ui';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getQuestionList } from '@/pages/PostQuestion/apis/getQuestionList';
import { postQuestionsRegister } from '@/pages/PostQuestion/apis/postQuestionsRegister';
import { postQuestionsSave } from '@/pages/PostQuestion/apis/postQuestionsSave';
import type { Group, QuestionSubmitRequest } from '@/pages/PostQuestion/types';

export const usePostQuestionsSave = () => {
  const { open } = useToast();
  return useMutation({
    mutationFn: (data: QuestionSubmitRequest) => postQuestionsSave(data),
    onSuccess: () =>
      open({ icon: 'success', content: '임시저장이 완료되었어요.' }),
  });
};

export const usePostQuestionsRegister = () => {
  const { open } = useToast();
  return useMutation({
    mutationFn: (data: QuestionSubmitRequest) => postQuestionsRegister(data),
    onSuccess: () =>
      open({ icon: 'success', content: '질문이 최종 등록 되었어요.' }),
  });
};

export const useGetQuestionList = (season: number, group: Group) => {
  return useQuery({
    queryKey: ['question', 'list', season, group],
    queryFn: () => getQuestionList(season, group),
    retry: 0,
    enabled: season !== 0,
    // 질문 데이터에 isLink, isAnswer 유도 값 추가 (charLimit이 null이면 주관식 해제)
    select: (data) => {
      return {
        commonQuestions: data.commonQuestions.map((question) => ({
          ...question,
          isLink: !!question.link,
          isAnswer: !question.isDescription && question.charLimit != null,
        })),
        partQuestions: data.partQuestions.map((partQuestion) => ({
          ...partQuestion,
          questions: partQuestion.questions.map((question) => ({
            ...question,
            isLink: !!question.link,
            isAnswer: !question.isDescription && question.charLimit != null,
          })),
        })),
      };
    },
  });
};
