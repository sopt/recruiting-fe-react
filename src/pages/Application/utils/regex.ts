export const isNumberValue = (value: string): boolean => {
  // biome-ignore lint/performance/useTopLevelRegex: 숫자 형식 검사
  return value === '' || /^\d*\.?\d*$/.test(value);
};
