import { IconPlus } from '@sopt-makers/icons';

interface FileInputProps {
  section?: string;
  id?: number;
  isReview?: boolean;
  disabled?: boolean;
  defaultFile?: File;
}

const ACCEPTED_FORMATS = '.pdf';

const IconPlusButton = ({ disabled }: { disabled?: boolean }) => {
  return (
    <button
      type="button"
      disabled={disabled}
      className={`
        flex justify-center items-center
        w-[2.7rem] h-[2.7rem] rounded-[0.6rem]
        bg-gray-400 transition-all duration-200 ease-in-out
        :hover:bg-gray-900 
        ${disabled && 'cursor-not-allowed'}
    `}
    >
      <div
        className={`w-[1.5rem] h-[1.5rem] transition-all duration-200 ease-in-out
        ${disabled && 'cursor-not-allowed'}
        `}
      >
        <IconPlus className="w-[1.5rem] h-[1.5rem]" />
      </div>
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
    <div className="relative w-[72rem] p-[1.6rem] bg-[#f5f5f5] rounded-[12px]">
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
          border border-solid 
          transition-all duration-200 ease-in-out
          ${'border-gray-100 stroke-[#f5f5f5]'}
          ${
            isDisabled
              ? 'text-gray-300 bg-[#f5f5f5] cursor-not-allowed'
              : 'cursor-pointer'
          }
        `}
      >
        <div
          className={`
          flex items-center w-full gap-[2.4rem] text-gray-300
        `}
        >
          <span className="body_1_18_m  text-gray-500">참고 자료</span>
          <span
            className={`
              w-[55.5rem]
              overflow-hidden whitespace-nowrap text-ellipsis
              text-gray-100
              ${isDisabled && 'text-gray-300 cursor-not-allowed'}
            `}
          >
            {displayText}
          </span>
        </div>
        <IconPlusButton disabled={isDisabled} />
      </label>
    </div>
  );
};

export default FileInput;
