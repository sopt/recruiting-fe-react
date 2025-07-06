export const getDontReadMessage = (list: string[]) => {
  return `${list.join(', ')}이(가) 읽지 말라고 선택했어요.`;
};

export const getEvalutionCompleteMessage = (list: string[]) => {
  return `${list.join(', ')}이(가) 평가를 완료했어요.`;
};
