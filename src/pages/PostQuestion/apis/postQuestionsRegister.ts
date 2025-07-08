import { tokenApi } from '@/apis/api';
import type { QuestionSubmitRequest } from '@/pages/PostQuestion/types';

export const postQuestionsRegister = async (data: QuestionSubmitRequest) => {
  const response = await tokenApi
    .post('api/v2/recruiting-question/register', {
      json: { ...data },
    })
    .json();

  return response;
};
