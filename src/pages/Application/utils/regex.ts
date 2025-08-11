export const isNumberValue = (value: string): boolean => {
  return value === '' || /^\d*\.?\d*$/.test(value);
};
