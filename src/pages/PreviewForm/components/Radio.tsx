import type { InputHTMLAttributes } from 'react';

interface RadioProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string[];
  name: string;
  defaultValue?: string;
  required?: boolean;
}

const Radio = ({
  label,
  name,
  defaultValue,
  required,
  disabled,
  ...rest
}: RadioProps) => {
  return (
    <div className="flex flex-col gap-[0.9rem]">
      <div className="flex gap-[2.4rem] items-center">
        {label.map((item: string) => (
          <div
            key={item}
            className="flex gap-[0.8rem] items-center w-[fit-content]"
          >
            <input
              className={`
                appearance-none
                rounded-full w-[2.2rem] h-[2.2rem] transition-all duration-300 ease-in-out cursor-pointer
                border-[1.5px] border-gray-100 bg-white
                checked:border-[6px] checked:border-gray-950 checked:bg-white
                focus-visible:outline-[2px] focus-visible:outline-dotted focus-visible:outline-gray-950 focus-visible:outline-offset-2
                disabled:cursor-not-allowed
                enabled:hover:bg-gray-100
                checked:hover:border-gray-950 checked:hover:bg-white
              `}
              type="radio"
              id={`${name}-${item}`}
              name={name}
              value={item}
              defaultChecked={defaultValue === item}
              disabled={disabled}
              {...rest}
            />
            <label
              className={`
                body_2_16_m cursor-pointer
                text-gray-950
                ${disabled ? 'cursor-not-allowed' : ''}
              `}
              htmlFor={`${name}-${item}`}
            >
              {item}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Radio;
