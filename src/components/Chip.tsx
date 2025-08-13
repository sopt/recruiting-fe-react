import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ChipProps extends ButtonHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const CHIP_BASE_STYLE =
  'rounded-[999.9rem] px-[1.4rem] py-[0.9rem] border-[1px] cursor-pointer label_3_14_sb';

const Chip = ({ children, className, ...props }: ChipProps) => {
  return (
    <div
      role="status"
      aria-description={`${children} chip`}
      className={`${CHIP_BASE_STYLE} ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Chip;
