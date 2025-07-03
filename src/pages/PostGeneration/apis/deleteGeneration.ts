import { api } from '@/apis/api';

export const deleteGeneration = (seasonId: number) => {
  const response = api
    .delete('api/v2/recruiting-season', {
      json: { seasonId },
    })
    .json();

  return response;
};
