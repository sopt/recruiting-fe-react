import { useEffect, useRef, useState } from 'react';

const getMoveTargetIndex = (itemArray: number[], currentY: number) => {
  return itemArray.findIndex(
    (y, index, array) =>
      index < array.length - 1 && y < currentY && currentY < array[index + 1],
  );
};

export const useDrag = (moveBoxes: (from: number, to: number) => void) => {
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const [mouseY, setMouseY] = useState<number | null>(null);
  const mouseYRef = useRef(0);
  const [toIndex, setToIndex] = useState<number | null>(null);

  // 마우스 y값과 요소 최상단 y값의 차이
  const offsetYRef = useRef<number>(0);
  const containerRef = useRef<HTMLUListElement>(null);
  const itemsTopRef = useRef<number[]>([]);

  const onMouseDown = (e: React.MouseEvent, index: number) => {
    const itemRect = e.currentTarget.getBoundingClientRect();

    setDragIndex(index);
    setMouseY(itemRect.top - containerRef.current!.getBoundingClientRect().top);
    offsetYRef.current = itemRect.top - e.clientY;

    const boxes = document.querySelectorAll('#dragBox');
    const itemsTop = Array.from(boxes).map(
      (el) =>
        (el as HTMLElement).getBoundingClientRect().top -
        containerRef.current!.getBoundingClientRect().top,
    );

    itemsTopRef.current = itemsTop;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  const prevY = useRef<number | null>(null);
  const directionRef = useRef<'up' | 'down' | null>(null);
  const directionChangedRef = useRef(false);
  const prevDirectionRef = useRef<'up' | 'down' | null>(null);

  const onMouseMove = (e: MouseEvent) => {
    const currentY = e.clientY;

    if (prevY.current !== null) {
      const newDirection = currentY > prevY.current ? 'down' : 'up';
      const isDirectionChanged = newDirection !== prevDirectionRef.current;

      if (isDirectionChanged) {
        directionChangedRef.current = true;
        prevDirectionRef.current = newDirection;
      } else {
        directionChangedRef.current = false;
      }
      directionRef.current = newDirection;
    }

    const newMouseY =
      e.clientY +
      offsetYRef.current -
      containerRef.current!.getBoundingClientRect().top;
    setMouseY(newMouseY);
    mouseYRef.current = newMouseY;

    const offset = directionRef.current === 'up' ? 1 : 0;
    let newToIndex =
      getMoveTargetIndex(itemsTopRef.current, mouseYRef.current) + offset + 1;

    if (directionRef.current === 'down' && newToIndex === -1) {
      newToIndex = itemsTopRef.current.length - 1;
    }

    if (newToIndex !== toIndex && newToIndex !== 0) {
      setToIndex(newToIndex);
    }

    prevY.current = currentY;
  };

  const onMouseUp = () => {
    setDragIndex(null);
    setMouseY(null);
    setToIndex(null);
    offsetYRef.current = 0;

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  useEffect(() => {
    if (
      dragIndex === toIndex ||
      dragIndex === null ||
      toIndex === null ||
      Math.abs(toIndex - dragIndex) > 1
    )
      return;

    if (directionChangedRef.current) {
      directionChangedRef.current = false;

      return; // 방향이 바뀐 페이즈에서는 움직임 생략
    }

    moveBoxes(toIndex, dragIndex);
    setDragIndex(toIndex);
  }, [toIndex]);

  return { containerRef, onMouseDown, mouseY, dragIndex };
};
