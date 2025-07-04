import { api } from '@/apis/api';
import type { ApplicantDetailResponse } from '@/pages/ApplicationDetail/types';

export const getApplicantDetail = async (applicantId: number) => {
  const res = await api.get(
    `api/v2/recruiting-admin/applicant/detail?applicantId=${applicantId}`,
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_ACCESS_TOKEN}`,
      },
    },
  );
  const data = await res.json<ApplicantDetailResponse>();

  return data.data;
};
