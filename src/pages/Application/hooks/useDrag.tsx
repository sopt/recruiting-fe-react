import type React from 'react';
import { type RefObject, useCallback, useState } from 'react';

const useDrag = (scrollContainerRef: RefObject<HTMLDivElement | null>) => {
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollShift, setScrollShift] = useState(0);

  const onDragStart = useCallback((e: React.MouseEvent) => {
    setIsDragging(true);
    setStartX(e.clientX);
    setScrollShift(scrollContainerRef.current?.scrollLeft || 0);
  }, []);

  const onDragMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      e.preventDefault();

      const x = e.clientX - startX;
      const newScrollShift = scrollShift - x;

      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = newScrollShift;
      }
    },
    [isDragging, startX, scrollShift],
  );

  const onDragEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const onDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  return {
    isDragging,
    onDragStart,
    onDragMove,
    onDragEnd,
    onDragLeave,
  };
};

export default useDrag;
