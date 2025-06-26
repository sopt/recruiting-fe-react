import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ChipProps extends ButtonHTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
}

const Chip = ({ children, className, ...props }: ChipProps) => {
  return (
    <div
      className={`rounded-[999.9rem] px-[1.4rem] py-[0.9rem] border-[1px] cursor-default label_3_14_sb ${className || ''}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Chip;
