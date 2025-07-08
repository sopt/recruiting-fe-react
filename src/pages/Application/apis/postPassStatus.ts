import { tokenApi } from '@/apis/api';
import type { PostApplicantPassStatusRequest } from '@/pages/Application/\btypes';

export const postPassStatus = ({
  applicantId,
  applicationPass,
  finalPass,
}: PostApplicantPassStatusRequest) => {
  const response = tokenApi
    .post('api/v2/recruiting-admin/applicant/pass-status', {
      json: {
        applicantId,
        applicationPass,
        finalPass,
      },
    })
    .json();

  return response;
};
