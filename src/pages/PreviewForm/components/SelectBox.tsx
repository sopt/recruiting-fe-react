import type { InputHTMLAttributes } from 'react';
import { ChevronDown } from '@/assets/svg';

export interface SelectBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  name: string;
  options: string[];
  size?: 'sm' | 'lg';
  required?: boolean;
}

const SelectBox = ({
  label,
  name,
  options,
  size = 'sm',
  required,
  readOnly = true,
  disabled,
  ...inputElementProps
}: SelectBoxProps) => {
  return (
    <div
      className={`
        flex flex-col gap-[0.8rem] body_2_16_m
        ${size === 'sm' ? 'w-[35.6rem]' : 'w-[72rem]'}
      `}
    >
      <label
        htmlFor={name}
        className="flex items-center gap-[0.6rem] w-[fit-content] cursor-pointer text-gray-950"
      >
        <span className="body_1_18_m ">{label}</span>
        {required && (
          <i className="w-[0.8rem] h-[0.8rem] rounded-full bg-gray-950" />
        )}
      </label>
      <div
        className={`flex p-[1.6rem] gap-[0.9rem] relative items-center justify-between rounded-[1.2rem] h-[5.8rem]
            placeholder:text-gray-400 border border-gray-100 body_2_16_r
            ${
              disabled
                ? 'cursor-not-allowed bg-gray-100 text-gray-500 pointer-events-none'
                : 'cursor-pointer bg-white text-gray-900 focus:border-gray-950 focus:outline-none'
            }`}
      >
        <input
          id={name}
          type="text"
          className={'body_2_16_r w-full bg-transparent'}
          role="combobox"
          aria-expanded="false"
          aria-haspopup="listbox"
          readOnly={readOnly}
          disabled={disabled}
          {...inputElementProps}
        />
        <ChevronDown className="w-[2.4rem] h-[2.4rem]" />
      </div>
    </div>
  );
};

export default SelectBox;
