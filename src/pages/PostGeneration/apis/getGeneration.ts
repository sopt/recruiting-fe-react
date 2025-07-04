import { api } from '@/apis/api';
import type { GetGenerationResponse } from '@/pages/PostGeneration/types';
import type { Group } from '@/pages/Question/types';

export const getGeneration = async (group: Group) => {
  const response = await api
    .get<GetGenerationResponse>('api/v2/recruiting-season/list', {
      searchParams: { group },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    })
    .json();

  return response;
};
