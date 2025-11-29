import { type ReactElement, type TextareaHTMLAttributes, useId } from 'react';
import Input from '@/pages/PreviewForm/components/Input';
import Label from '@/pages/PreviewForm/components/Label';

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  placeholder: string;
  required: boolean;
  maxCount: number;
  extraInput?: ReactElement;
  onlyFileUpload: boolean;
  children: string;
  questionIndex: number;
}

const Textarea = ({
  name,
  placeholder,
  required,
  maxCount,
  extraInput,
  onlyFileUpload,
  children,
  questionIndex,
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
        <Input
          id={id}
          name={name}
          placeholder={placeholder}
          required={required}
          maxCount={maxCount}
          isFileInput={!!extraInput}
        />
      )}
    </div>
  );
};

export default Textarea;
