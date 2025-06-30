import { getGeneration } from '@/pages/PostGeneration/apis/getGeneration';
import type { GROUP } from '@/pages/Question/types';
import { useQuery } from '@tanstack/react-query';

const QUERY_KEY = {
  GET_GENERATION: 'getGeneration',
};

export const useGetGeneration = (group: GROUP) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_GENERATION, group],
    queryFn: () => getGeneration(group),
  });
};
