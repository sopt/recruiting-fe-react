import dayjs from 'dayjs';

import { tokenApi } from '@/apis/api';
import type { PostApplicantCsvRequest } from '@/pages/Application/\btypes';

const createDefaultCsvFileName = (season: number) => {
  return `지원자목록_${season}_${dayjs().format('YYYYMMDD_HHmmss')}.csv`;
};

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

  return fileName ?? createDefaultCsvFileName(request.season);
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
