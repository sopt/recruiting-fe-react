import type { ExecutiveType } from '@/pages/Application/\btypes';
import { EXECUTIVE_TYPE_LABEL } from '@/pages/ApplicationDetail/constant';

export const getDontReadMessage = (list: ExecutiveType[]) => {
  const partList = list.map((part) => EXECUTIVE_TYPE_LABEL[part]);

  return `${partList.join(', ')}이(가) 읽지 말라고 선택했어요.`;
};

export const getEvalutionCompleteMessage = (list: ExecutiveType[]) => {
  const partList = list.map((part) => EXECUTIVE_TYPE_LABEL[part]);

  return `${partList.join(', ')}이(가) 평가를 완료했어요.`;
};
