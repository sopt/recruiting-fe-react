import type { RefObject } from 'react';

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};

export const scrollToLeft = (elementRef?: RefObject<HTMLElement>) => {
  if (elementRef?.current) {
    elementRef.current.scrollTo({
      left: 0,
      behavior: 'smooth',
    });
  }
};

export const scrollToBottom = (elementRef?: RefObject<HTMLElement>) => {
  if (elementRef?.current) {
    elementRef.current.scrollTo({
      top: elementRef.current.scrollHeight,
      behavior: 'smooth',
    });
  }
};
