import queryClient from '@/apis/queryClient';
import { deleteGeneration } from '@/pages/PostGeneration/apis/deleteGeneration';
import { getGeneration } from '@/pages/PostGeneration/apis/getGeneration';
import { postGeneration } from '@/pages/PostGeneration/apis/postGeneration';
import type { PostGenerationRequest } from '@/pages/PostGeneration/types';
import type { Group } from '@/pages/Question/types';
import { useMutation, useQuery } from '@tanstack/react-query';

const QUERY_KEY = {
  GET_GENERATION: 'getGeneration',
};

export const useGetGeneration = (group: Group) => {
  return useQuery({
    queryKey: [QUERY_KEY.GET_GENERATION, group],
    queryFn: () => getGeneration(group),
  });
};

export const usePostGeneration = (season: PostGenerationRequest) => {
  return useMutation({
    mutationFn: () => postGeneration(season),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_GENERATION],
      });
    },
  });
};

export const useDeleteGeneration = () => {
  return useMutation({
    mutationFn: (seasonId: number) => deleteGeneration(seasonId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_GENERATION],
      });
    },
  });
};
