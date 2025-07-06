import { tokenApi } from '@/apis/api';
import type {
  PartType,
  PostMinRateResponse,
} from '@/pages/Application/\btypes';
import type { Group } from '@/pages/Question/types';

export const postMinRate = async (
  minimumRate: number,
  season: string,
  group: Group,
  selectedPart: PartType,
): Promise<PostMinRateResponse> => {
  const response = await tokenApi
    .post<PostMinRateResponse>('api/v2/recruiting-admin/question/char-limits', {
      json: {
        minimumRate,
        season,
        group,
        part: selectedPart,
      },
    })
    .json();

  return response;
};
