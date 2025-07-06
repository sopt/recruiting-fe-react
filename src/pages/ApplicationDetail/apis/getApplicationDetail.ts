import { api } from '@/apis/api';
import type { ApplicationDetailResponse } from '@/pages/ApplicationDetail/types';

export const getApplicationDetail = async (applicantId: number) => {
  const res = await api.get(
    `api/v2/recruiting-admin/applicant/detail?applicantId=${applicantId}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    },
  );
  const data = await res.json<ApplicationDetailResponse>();

  return data.data;
};
