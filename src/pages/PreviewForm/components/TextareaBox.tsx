import { type ReactElement, type TextareaHTMLAttributes, useId } from 'react';
import Label from '@/pages/PreviewForm/components/Label';
import Textarea from '@/pages/PreviewForm/components/Textarea';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder: string;
  required: boolean;
  maxCount: number;
  extraInput?: ReactElement;
  onlyFileUpload: boolean;
  children: string;
  questionIndex: number;
  disabled?: boolean;
}

const TextareaBox = ({
  name,
  placeholder,
  required,
  maxCount,
  extraInput,
  onlyFileUpload,
  children,
  questionIndex,
  disabled = true,
}: TextareaProps) => {
  const id = useId();

  return (
    <div className="flex flex-col gap-[0.8rem] items-center">
      <Label
        label={id}
        maxCount={maxCount}
        required={required}
        questionIndex={questionIndex}
      >
        {children}
      </Label>
      {extraInput}
      {!onlyFileUpload && (
        <Textarea
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          maxCount={maxCount}
          isFileInput={!!extraInput}
          disabled={disabled}
        />
      )}
    </div>
  );
};

export default TextareaBox;
