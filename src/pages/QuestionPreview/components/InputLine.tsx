import type { ReactNode } from 'react';

interface InputLineProps {
  name?: string;
  placeholder?: string;
  defaultValue?: string | number;
  value?: string | number;
  disabled?: boolean;
  readOnly?: boolean;
  type?: string;
  children?: ReactNode;
}

const InputLine = ({
  name,
  placeholder,
  defaultValue,
  value,
  disabled = false,
  readOnly = true,
  type = 'text',
  children,
}: InputLineProps) => {
  return (
    <>
      <div className="flex gap-[10px] relative">
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          defaultValue={defaultValue}
          value={value}
          disabled={disabled}
          readOnly={readOnly}
          className={`
            flex-1 p-[1.6rem] bg-white rounded-[1.2rem] h-[5.8rem]
            text-gray-900 placeholder:text-gray-400
            border border-gray-100
            focus:border-gray-950 focus:outline-none
            disabled:cursor-not-allowed disabled:bg-gray-100 disabled:text-gray-500 pointer-events-none
            body_2_16_r
          `}
        />
        {children}
      </div>
    </>
  );
};

export default InputLine;
