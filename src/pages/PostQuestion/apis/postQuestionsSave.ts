import { api } from '@/apis/api';
import type { QuestionSubmitRequest } from '@/pages/PostQuestion/types';

export const postQuestionsSave = async (data: QuestionSubmitRequest) => {
  const response = await api
    .post('api/v2/recruiting-question/save', {
      json: { ...data },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    })
    .json();

  return response;
};
