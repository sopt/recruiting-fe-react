import { tokenApi } from '@/apis/api';
import type {
  PostGenerationRequest,
  PostGenerationResponse,
} from '@/pages/PostGeneration/types';

export const postGeneration = async (season: PostGenerationRequest) => {
  const response = await tokenApi
    .post<PostGenerationResponse>('api/v2/recruiting-season', {
      json: season,
    })
    .json();

  return response;
};
