interface FileInputProps {
  section?: string;
  id?: number;
  isReview?: boolean;
  disabled?: boolean;
  defaultFile?: File;
}

const ACCEPTED_FORMATS = '.pdf';

const IconPlusButton = ({
  isSelected,
  disabled,
}: {
  isSelected: boolean;
  disabled?: boolean;
}) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        flex justify-center items-center
        w-[27px] h-[27px] rounded-[6px]
        transition-all duration-200 ease-in-out
        bg-gray-950 hover:bg-gray-700
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
    `}
    >
      <svg
        width="15"
        height="15"
        viewBox="0 0 15 15"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`
        transition-all duration-200 ease-in-out
        ${isSelected ? 'rotate-45' : 'rotate-0'}
      `}
      >
        <path
          d="M7.5 1.5V13.5M1.5 7.5H13.5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`
          ${!disabled ? 'active:stroke-gray-300' : ''}
        `}
        />
      </svg>
    </button>
  );
};

const FileInput = ({
  isReview = false,
  disabled = false,
  defaultFile,
}: FileInputProps) => {
  const isDisabled = disabled || isReview;
  const displayText = defaultFile?.name || '50mb 이하 | pdf';

  return (
    <div className="relative w-[72rem]">
      <input
        type="file"
        accept={ACCEPTED_FORMATS}
        className="hidden"
        disabled={isDisabled}
        id="file-input"
      />
      <label
        htmlFor="file-input"
        className={`
          flex justify-between items-center w-full
          border border-solid rounded-[12px]
          transition-all duration-200 ease-in-out
          ${'border-gray-100 bg-[#f5f5f5] stroke-[#f5f5f5]'}
          ${
            isDisabled
              ? 'text-gray-300 bg-[#f5f5f5] cursor-not-allowed'
              : 'cursor-pointer'
          }
        `}
      >
        <div
          className={`
          flex items-center w-full gap-6 text-gray-300
        `}
        >
          <span className="body_2_16_m text-gray-950">참고 자료</span>
          <span
            className={`
              w-[55.5rem]
              overflow-hidden whitespace-nowrap text-ellipsis
              text-gray-200
              ${isDisabled ? 'text-gray-300 cursor-not-allowed' : ''}
            `}
          >
            {displayText}
          </span>
        </div>
        <IconPlusButton isSelected={false} disabled={isDisabled} />
      </label>
    </div>
  );
};

export default FileInput;
