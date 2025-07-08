import { tokenApi } from '@/apis/api';
import type { Group } from '@/pages/PostQuestion/types';

export const getQuestionList = async (season: number, group: Group) => {
  const response = await tokenApi
    .get('api/v2/recruiting-question/admin/list', {
      searchParams: {
        season: season,
        group: group,
      },
    })
    .json();

  return response;
};
