import { type InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { ChevronDown } from '@/assets/svg';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectBoxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  name: string;
  options: SelectOption[];
  size?: 'sm' | 'lg';
  required?: boolean;
  onValueChange?: (value: string) => void;
}

const SelectBox = ({
  label,
  name,
  options,
  size = 'sm',
  required,
  disabled,
  defaultValue,
  onValueChange,
  ...inputElementProps
}: SelectBoxProps) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue || '');
  const [isOpen, setIsOpen] = useState(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectClick = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  const selectedLabel =
    options.find((opt) => opt.value === selectedValue)?.label || '';

  return (
    <div
      className={`
        flex flex-col gap-[0.8rem] body_2_16_m
        ${size === 'sm' ? 'w-[35.6rem]' : 'w-[72rem]'}
      `}
      ref={selectRef}
    >
      <label
        htmlFor={name}
        className="flex items-center gap-[0.6rem] w-[fit-content] cursor-pointer text-gray-950"
      >
        <span className="body_1_18_m">{label}</span>
        {required && (
          <i className="w-[0.8rem] h-[0.8rem] rounded-full bg-gray-950" />
        )}
      </label>
      <div className="flex flex-col gap-[0.9rem] relative">
        <button
          type="button"
          className={`
            flex p-[1.6rem] gap-[0.9rem] items-center justify-between rounded-[1.2rem]
            border border-gray-100 body_2_16_r transition-all duration-300 ease-in-out w-full
            ${
              disabled
                ? 'cursor-not-allowed bg-gray-100 text-gray-500 border-gray-100'
                : 'cursor-pointer bg-white text-gray-900 border-gray-100 hover:border-gray-300'
            }
            ${isOpen && !disabled ? 'border-gray-950' : ''}
          `}
          onClick={handleSelectClick}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleSelectClick();
            }
          }}
          disabled={disabled}
          aria-expanded={isOpen}
          aria-haspopup="listbox"
        >
          <input id={name} name={name} type="hidden" value={selectedValue} />
          <span
            className={`body_2_16_r w-full text-left ${
              !selectedValue ? 'text-gray-400' : 'text-gray-900'
            }`}
          >
            {selectedLabel || inputElementProps.placeholder || '선택하세요'}
          </span>
          <ChevronDown
            className={`
              w-[2.4rem] h-[2.4rem] text-gray-300 transition-transform duration-300 ease-out flex-shrink-0
              ${isOpen && !disabled ? 'rotate-180' : ''}
              ${disabled ? 'hidden' : ''}
            `}
          />
        </button>

        <div
          role="listbox"
          className={`
            flex flex-col absolute w-full top-[6.7rem] p-[1.5rem_0.8rem] max-h-[22.4rem] overflow-auto
            bg-white rounded-[1.2rem] border border-gray-100
            transition-all duration-300 ease-in-out z-50
            ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
          `}
        >
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              role="option"
              aria-selected={selectedValue === option.value}
              onClick={() => handleOptionClick(option.value)}
              className={`
                flex w-full p-[0.6rem_0.8rem] body_2_16_r cursor-pointer text-gray-500 text-left
                hover:bg-gray-100 hover:rounded-[1rem] hover:text-gray-950
                ${
                  selectedValue === option.value
                    ? 'title_6_16_sb text-gray-950'
                    : ''
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectBox;
