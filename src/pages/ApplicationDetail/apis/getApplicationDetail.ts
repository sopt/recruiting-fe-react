import { tokenApi } from '@/apis/api';
import type { ApplicationDetailResponse } from '@/pages/ApplicationDetail/types';

export const getApplicationDetail = async (applicantId: number) => {
  const data = await tokenApi
    .get(`recruiting-admin/applicant/detail?applicantId=${applicantId}`)
    .json<ApplicationDetailResponse>();

  return data.data;
};
