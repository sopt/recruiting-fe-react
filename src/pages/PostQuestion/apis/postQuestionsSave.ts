import { tokenApi } from '@/apis/api';
import type { QuestionSubmitRequest } from '@/pages/PostQuestion/types';

export const postQuestionsSave = async (data: QuestionSubmitRequest) => {
  const response = await tokenApi
    .post('api/v2/recruiting-question/save', {
      json: { ...data },
    })
    .json();

  return response;
};
