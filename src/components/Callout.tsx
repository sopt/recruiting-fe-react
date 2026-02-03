import { IconAlertCircle } from '@sopt-makers/icons';
import type { PropsWithChildren } from 'react';
import { cn } from '@/utils/cn';

interface CalloutProps extends PropsWithChildren {
  className?: string;
}

const Callout = ({ className, children }: CalloutProps) => {
  return (
    <article
      className={cn(
        'flex flex-col p-[2.8rem] items-start bg-gray20 rounded-[1.6rem]',
        className
      )}
    >
      <div className="flex items-center gap-[2.2rem]">
        <IconAlertCircle
          style={{
            width: '3.2rem',
            height: '3.2rem',
            color: `var(--color-yellow500)`,
            fill: `var(--color-yellow200)`,
          }}
        />
        {children}
      </div>
    </article>
  );
};

export default Callout;
