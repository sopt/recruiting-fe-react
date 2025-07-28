import { tokenApi } from '@/apis/api';
import type { PostEvaluationRequest } from '@/pages/Application/\btypes';

export const postEvaluation = ({
  applicantId,
  evaluationType,
  isChecked,
}: PostEvaluationRequest) => {
  const response = tokenApi
    .post('api/v2/recruiting-admin/evaluation/toggle', {
      json: {
        applicantId,
        evaluationType,
        isChecked,
      },
    })
    .json();

  return response;
};
