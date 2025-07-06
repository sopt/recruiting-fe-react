import { postQuestionsSave } from '@/pages/PostQuestion/apis/postQuestionsSave';
import type { QuestionSubmitRequest } from '@/pages/PostQuestion/types';
import { useMutation } from '@tanstack/react-query';

export const usePostQuestionsSave = () => {
  return useMutation({
    mutationFn: (data: QuestionSubmitRequest) => postQuestionsSave(data),
  });
};
