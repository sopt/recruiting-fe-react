import { api } from '@/apis/api';
import type { GROUP } from '@/pages/PostQuestion/types';

export const getQuestionList = async (season: number, group: GROUP) => {
  const response = await api
    .get('api/v2/recruiting-question/admin/list', {
      searchParams: {
        season: season,
        group: group,
      },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    })
    .json();

  return response;
};
