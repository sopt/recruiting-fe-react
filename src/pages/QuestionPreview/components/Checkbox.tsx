import type { InputHTMLAttributes } from 'react';

interface CheckboxProps extends InputHTMLAttributes<HTMLInputElement> {
  children?: string | number;
  showRequiredDot?: boolean;
}

const Checkbox = ({
  children,
  showRequiredDot = false,
  ...props
}: CheckboxProps) => {
  return (
    <>
      <div className="flex items-center justify-between w-full">
        <label className="flex items-center gap-[6px] relative w-fit select-none text-[18px] font-medium leading-[27px] cursor-pointer">
          <input
            type="checkbox"
            className="peer amp-unmask absolute opacity-0 cursor-pointer h-0 w-0"
            {...props}
          />
          <span
            className={`
              relative h-[22px] w-[22px] rounded-[5px]
              transition-all duration-300 ease-in-out cursor-pointer
              border border-gray-100
              peer-checked:border-gray-950 peer-checked:bg-gray-950
              peer-checked:enabled:hover:border-gray-950 peer-checked:enabled:hover:bg-gray-950
              peer-disabled:cursor-not-allowed
              after:content-[''] after:absolute after:hidden
              after:top-[3px] after:left-[8px] after:w-[6px] after:h-[11px]
              after:border-white after:border-r-[1.5px] after:border-b-[1.5px]
              after:rotate-45
              peer-checked:after:block
            `}
          />
          <span className="body_1_18_m text-gray-950">{children}</span>
          {showRequiredDot && (
            <i className="inline-block rounded-full w-[0.8rem] h-[0.8rem] bg-gray-950" />
          )}
        </label>
      </div>
    </>
  );
};

export default Checkbox;
