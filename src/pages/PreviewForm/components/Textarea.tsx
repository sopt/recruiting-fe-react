import type { TextareaHTMLAttributes } from 'react';
import { cn } from '@/utils/cn';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder: string;
  maxCount: number;
  isFileInput?: boolean;
  currentCount?: number;
}

const Textarea = ({
  name,
  placeholder,
  maxCount,
  required,
  isFileInput,
  currentCount = 0,
  disabled,
  className,
  ...textareaElements
}: TextareaProps) => {
  const textareaSize = isFileInput || maxCount <= 100 ? 'sm' : 'lg';
  const textareaHeightClass = textareaSize === 'sm' ? 'h-[112px]' : 'h-[507px]';

  const textareaClasses = [
    'w-full p-[1.6rem] rounded-xl whitespace-pre-line break-all resize-none',
    'body_2_16_r',
    textareaHeightClass,
    disabled && 'text-gray-500 bg-gray-100 cursor-not-allowed',
    'placeholder:text-gray100',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="flex flex-col gap-2 justify-center w-[720px]">
      <textarea
        name={name}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        className={cn(textareaClasses)}
        {...textareaElements}
      />
      <p className="flex justify-end items-center w-full body_2_16_r">
        <span>
          <span className="text-gray-950">{currentCount || 0}</span>
          <span className="text-gray-500">/{maxCount}</span>
        </span>
      </p>
    </div>
  );
};

export default Textarea;
