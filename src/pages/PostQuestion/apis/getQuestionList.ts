import { tokenApi } from '@/apis/api';
import type { Group, QuestionListResponse } from '@/pages/PostQuestion/types';

export const getQuestionList = async (season: number, group: Group) => {
  const response = await tokenApi
    .get<QuestionListResponse>('api/v2/recruiting-question/admin/list', {
      searchParams: {
        season: season,
        group: group,
      },
    })
    .json();

  return response;
};
