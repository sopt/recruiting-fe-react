import { tokenApi } from '@/apis/api';
import type { GetGenerationResponse } from '@/pages/PostGeneration/types';
import type { Group } from '@/pages/Question/types';

export const getGeneration = async (group: Group) => {
  const response = await tokenApi
    .get<GetGenerationResponse>('api/v2/recruiting-season/list', {
      searchParams: { group },
    })
    .json();

  return response;
};
