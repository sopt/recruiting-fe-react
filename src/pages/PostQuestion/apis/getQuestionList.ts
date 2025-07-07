import { tokenApi } from '@/apis/api';
import type { GROUP } from '@/pages/PostQuestion/types';

export const getQuestionList = async (season: number, group: GROUP) => {
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
