import { useEffect, useRef, useState, type ReactElement } from 'react';

interface DragBoxProps {
  index: number;
  dragIndex: number | null;
  mouseY: number | null;
  onMouseDown: (e: React.MouseEvent, index: number) => void;
  children: ReactElement;
}

export const DragBox = ({
  index,
  dragIndex,
  mouseY,
  onMouseDown,
  children,
}: DragBoxProps) => {
  const childRef = useRef<HTMLDivElement | null>(null);

  const [placeholderSize, setPlaceholderSize] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    if (index === dragIndex && childRef.current) {
      const rect = childRef.current.getBoundingClientRect();
      setPlaceholderSize({
        width: rect.width,
        height: rect.height,
      });
    }
  }, [dragIndex]);

  return (
    <>
      <div
        id="dragBox"
        ref={childRef}
        onMouseDown={(e) => onMouseDown(e, index)}
        className={index === dragIndex ? 'absolute' : ''}
        style={
          index === dragIndex && mouseY
            ? { top: `${mouseY}px`, left: 0, right: 0 }
            : {}
        }
      >
        {children}
      </div>
      {index === dragIndex && (
        <div
          style={{
            width: `${placeholderSize.width}px`,
            height: `${placeholderSize.height}px`,
          }}
        />
      )}
    </>
  );
};
