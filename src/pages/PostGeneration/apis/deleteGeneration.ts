import { tokenApi } from '@/apis/api';

export const deleteGeneration = (seasonId: number) => {
  const response = tokenApi
    .delete('recruiting-season', {
      json: { seasonId },
    })
    .json();

  return response;
};
