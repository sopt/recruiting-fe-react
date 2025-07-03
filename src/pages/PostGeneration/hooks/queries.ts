import queryClient from '@/apis/queryClient';
import { deleteGeneration } from '@/pages/PostGeneration/apis/deleteGeneration';
import { postGeneration } from '@/pages/PostGeneration/apis/postGeneration';
import type { PostGenerationRequest } from '@/pages/PostGeneration/types';
import type { GROUP } from '@/pages/Question/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getGeneration } from '../apis/getGeneration';

const QUERY_KEY = {
  GET_GENERATION: 'getGeneration',
};

export const useGetGeneration = (group: GROUP) => {
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

export const useDeleteGeneration = (seasonId: number) => {
  return useMutation({
    mutationFn: () => deleteGeneration(seasonId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEY.GET_GENERATION],
      });
    },
  });
};
