import { tokenApi } from '@/apis/api';

export const deleteGeneration = (seasonId: number) => {
  const response = tokenApi
    .delete('api/v2/recruiting-season', {
      json: { seasonId },
    })
    .json();

  return response;
};
