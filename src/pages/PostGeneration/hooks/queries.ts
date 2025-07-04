import type { Group } from '@/pages/Question/types';
import { useQuery } from '@tanstack/react-query';
import { getGeneration } from '../apis/getGeneration';

const QUERY_KEY = {
  GET_GENERATION: 'getGeneration',
};

export const useGetGeneration = (group: Group) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_GENERATION, group],
    queryFn: () => getGeneration(group),
  });
};
