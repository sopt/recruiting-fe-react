import { tokenApi } from '@/apis/api';
import type {
  PostGenerationRequest,
  PostGenerationResponse,
} from '@/pages/PostGeneration/types';

export const postGeneration = async (season: PostGenerationRequest) => {
  const response = await tokenApi
    .post<PostGenerationResponse>('recruiting-season', {
      json: season,
    })
    .json();

  return response;
};
