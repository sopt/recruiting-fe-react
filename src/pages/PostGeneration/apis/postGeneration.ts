import { api } from '@/apis/api';
import type {
  PostGenerationRequest,
  PostGenerationResponse,
} from '@/pages/PostGeneration/types';

export const postGeneration = async (season: PostGenerationRequest) => {
  const response = await api
    .post<PostGenerationResponse>('api/v2/recruiting-season', {
      json: season,
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    })
    .json();

  return response;
};
