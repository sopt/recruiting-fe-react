import { useMutation, useSuspenseQuery } from '@tanstack/react-query';
import queryClient from '@/apis/queryClient';
import { deleteGeneration } from '@/pages/PostGeneration/apis/deleteGeneration';
import { getGeneration } from '@/pages/PostGeneration/apis/getGeneration';
import { postGeneration } from '@/pages/PostGeneration/apis/postGeneration';
import type { PostGenerationRequest } from '@/pages/PostGeneration/types';
import type { Group } from '@/pages/PostQuestion/types';

const QUERY_KEY = {
  GET_GENERATION: 'getGeneration',
};

export const useGetGeneration = (group: Group) => {
  return useSuspenseQuery({
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
