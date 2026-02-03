import { tokenApi } from '@/apis/api';
import type { GetGenerationResponse } from '@/pages/PostGeneration/types';
import type { Group } from '@/pages/PostQuestion/types';

export const getGeneration = async (group: Group) => {
  const response = await tokenApi
    .get<GetGenerationResponse>('recruiting-season/list', {
      searchParams: { group },
    })
    .json();

  return response;
};
