interface TextBoxProps {
  name: string;
  label: string;
  required: boolean;
  size: 'sm' | 'lg';
  children: React.ReactNode;
}

const TextBox = ({ name, label, required, size, children }: TextBoxProps) => {
  return (
    <div
      className={`flex flex-col gap-[0.8rem] body_1_18_m ${
        size === 'sm' ? 'w-[35.6rem]' : 'w-[72rem]'
      }`}
    >
      <label
        htmlFor={name}
        className="flex items-center gap-[0.6rem] w-[fit-content] cursor-pointer text-gray-950"
      >
        <span className="body_1_18_m ">{label}</span>
        {required && (
          <i className="w-[0.8rem] h-[0.8rem] text-gray-950 rounded-full bg-gray-950" />
        )}
      </label>
      {children}
    </div>
  );
};

export default TextBox;
