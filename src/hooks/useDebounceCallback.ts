import { useCallback, useRef } from 'react';

export const useDebouncedCallback = <T extends (...args: unknown[]) => void>(
  callback: T,
  delay = 500
) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(
    (...args: Parameters<T>) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  ) as T;
};
