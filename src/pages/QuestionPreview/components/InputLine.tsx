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
      <div className="flex gap-[1rem] relative">
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
            border border-gray-100
            focus:border-gray-950 focus:outline-none
            disabled:cursor-not-allowed disabled:bg-[#f5f5f5] 
            placeholder:text-gray100
            body_2_16_r
          `}
        />
        {children}
      </div>
    </>
  );
};

export default InputLine;
