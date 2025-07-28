import SvgBubblePoint from '@/assets/svg/BubblePoint';
import { TooltipProvider } from '@/contexts/TooltipContext';
import { useTooltipContext } from '@/contexts/TooltipContext';
import { useTooltip } from '@/hooks/useTooltip';
import clsx from 'clsx';
import type { HTMLAttributes, PropsWithChildren } from 'react';
import { forwardRef, useId, useImperativeHandle } from 'react';

interface TooltipRootProps extends HTMLAttributes<HTMLDivElement> {
  isOpen?: boolean;
}

const TooltipRoot = ({
  isOpen: controlledOpen,
  children,
  ...props
}: TooltipRootProps) => {
  const tooltipId = useId();

  return (
    <TooltipProvider controlledOpen={controlledOpen} id={tooltipId}>
      <div className={'relative w-fit pr-4 cursor-default'} {...props}>
        {children}
      </div>
    </TooltipProvider>
  );
};

const TooltipTrigger = ({ children }: PropsWithChildren) => {
  const { triggerRef, showTooltip, hideTooltip, id } = useTooltipContext();

  return (
    <div
      className="flex items-center gap-[0.4rem] whitespace-nowrap text-gray-300 text-label_4_12_sb z-10"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      ref={triggerRef}
      aria-describedby={id}
    >
      {children}
    </div>
  );
};

interface TooltipContentProps
  extends HTMLAttributes<HTMLDivElement>,
    PropsWithChildren {}

const TooltipContent = forwardRef<HTMLDivElement, TooltipContentProps>(
  ({ children, className, ...props }, ref) => {
    const { isOpen, id } = useTooltipContext();
    const { position, contentRef } = useTooltip();

    // forwardRef로 받은 ref를 contentRef와 연결
    useImperativeHandle(ref, () => contentRef.current!, [contentRef]);

    return (
      <div
        id={id}
        aria-hidden={!isOpen}
        className={clsx(
          'absolute right-0 mt-[0.8rem] w-max p-[1.6rem] rounded-[1rem] bg-gray600 transition-all duration-300 ease-in-out z-999',
          isOpen
            ? 'opacity-100 visible translate-y-[-10px]'
            : 'opacity-0 invisible translate-y-[10px]',
          position === 'top'
            ? 'bottom-[3.5rem] top-auto'
            : 'top-[3.5rem] bottom-auto',
          className,
        )}
        ref={contentRef}
        role="tooltip"
        {...props}
      >
        <SvgBubblePoint
          width={16}
          height={17}
          className={clsx(
            'absolute right-[1.6rem]',
            position === 'top'
              ? 'bottom-[-1.3rem] top-auto rotate-180'
              : 'top-[-1.3rem] bottom-auto rotate-0',
          )}
        />
        <span className="break-words text-gray50 text-label_4_12_sb">
          {children}
        </span>
      </div>
    );
  },
);

const Tooltip = {
  Root: TooltipRoot,
  Trigger: TooltipTrigger,
  Content: TooltipContent,
};

export default Tooltip;
