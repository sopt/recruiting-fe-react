import { tokenApi } from '@/apis/api';
import type { PostApplicantCsvRequest } from '@/pages/Application/\btypes';

const getCsvFileName = (
  contentDisposition: string | null,
  request: PostApplicantCsvRequest,
) => {
  const encodedFileName = contentDisposition?.match(
    /filename\*=UTF-8''([^;]+)/i,
  )?.[1];

  if (encodedFileName) {
    return decodeURIComponent(encodedFileName);
  }

  const fileName = contentDisposition?.match(/filename="?([^";]+)"?/i)?.[1];

  return fileName ?? `applicants_${request.season}_${request.group}.csv`;
};

export const postApplicantCsv = async (request: PostApplicantCsvRequest) => {
  const response = await tokenApi.post('recruiting-admin/applicant/csv', {
    json: request,
  });

  const blob = await response.blob();
  const fileName = getCsvFileName(
    response.headers.get('Content-Disposition'),
    request,
  );

  return { blob, fileName };
};
