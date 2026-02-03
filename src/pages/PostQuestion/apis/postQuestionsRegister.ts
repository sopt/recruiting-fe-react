import { tokenApi } from '@/apis/api';
import type { QuestionSubmitRequest } from '@/pages/PostQuestion/types';

export const postQuestionsRegister = async (data: QuestionSubmitRequest) => {
  const response = await tokenApi
    .post('recruiting-question/register', {
      json: { ...data },
    })
    .json();

  return response;
};
