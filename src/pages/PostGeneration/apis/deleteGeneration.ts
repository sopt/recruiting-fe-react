import { api } from '@/apis/api';

export const deleteGeneration = (seasonId: number) => {
  const response = api
    .delete('api/v2/recruiting-season', {
      json: { seasonId },
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    })
    .json();

  return response;
};
