import { tokenApi } from '@/apis/api';
import type {
  GetApplicantListRequest,
  GetApplicantListResponse,
} from '@/pages/Application/\btypes';

export const getApplicantList = async ({
  season,
  group,
  part,
  offset,
  limit,
  minRate,
  hideEvaluated,
  hideDontRead,
  checkInterviewPass,
}: GetApplicantListRequest): Promise<GetApplicantListResponse> => {
  const params = {
    season,
    group,
    offset,
    limit,
    minRate,
    hideEvaluated,
    hideDontRead,
    checkInterviewPass,
    ...(part !== undefined && { part }),
  };

  const response = await tokenApi
    .get<GetApplicantListResponse>('api/v2/recruiting-admin/applicant/list', {
      searchParams: params,
    })
    .json();

  return response;
};
