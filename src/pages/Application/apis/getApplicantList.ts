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
  isCompleteHidden,
  isDoNotRead,
  isPassedOnly,
}: GetApplicantListRequest): Promise<GetApplicantListResponse> => {
  const response = await tokenApi
    .get<GetApplicantListResponse>('api/v2/recruiting-admin/applicant/list', {
      searchParams: {
        season,
        group,
        offset,
        limit,
        minRate,
        hideEvaluated,
        hideDontRead,
        checkInterviewPass,
        part,
        isCompleteHidden,
        isDoNotRead,
        isPassedOnly,
      },
    })
    .json();

  return response;
};
