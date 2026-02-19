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
  hideEvaluated,
  checkInterviewPass,
  passStatus,
  searchKeyword,
}: GetApplicantListRequest): Promise<GetApplicantListResponse['data']> => {
  const params = {
    season,
    group,
    offset,
    limit,
    hideEvaluated,
    checkInterviewPass,
    passStatus,
    searchKeyword,
    ...(part !== undefined && { part }),
  };

  const response = await tokenApi
    .get<GetApplicantListResponse>('recruiting-admin/applicant/list', {
      searchParams: params,
    })
    .json();

  return response.data;
};
