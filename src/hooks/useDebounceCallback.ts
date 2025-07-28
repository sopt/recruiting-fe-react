import { useCallback, useRef } from 'react';

export const useDebouncedCallback = (callback: () => void, delay = 500) => {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  return useCallback(() => {
    if (timeoutRef.current) return;

    callback();
    timeoutRef.current = setTimeout(() => {
      timeoutRef.current = null;
    }, delay);
  }, [callback, delay]);
};
