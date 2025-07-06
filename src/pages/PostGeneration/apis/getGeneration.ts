import { tokenApi } from '@/apis/api';
import type { GetGenerationResponse } from '@/pages/PostGeneration/types';
import type { GROUP } from '@/pages/PostQuestion/types';

export const getGeneration = async (group: GROUP) => {
  const response = await tokenApi
    .get<GetGenerationResponse>('api/v2/recruiting-season/list', {
      searchParams: { group },
    })
    .json();

  return response;
};
