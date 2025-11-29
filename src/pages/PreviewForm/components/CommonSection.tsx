import type { ReactElement } from 'react';
import Textarea from './Textarea';

interface Question {
  id: number;
  question: string;
  charLimit: number;
  placeholder: string;
  urls?: string[];
  isFile?: boolean;
  optional?: boolean;
  isDescription?: boolean;
}

interface CommonSectionProps {
  questions?: Question[];
  infoComponent?: ReactElement;
  fileInputComponent?: ReactElement;
  linkInputComponent?: ReactElement;
}

const CommonSection = ({
  questions,
  infoComponent,
  fileInputComponent,
  linkInputComponent,
}: CommonSectionProps) => {
  return (
    <section id="common" className="flex flex-col gap-[5rem] w-[72rem]">
      <h2 className="w-[72rem] title_2_28_sb text-gray-950">공통 질문</h2>
      {questions?.map(
        ({
          question,
          id,
          charLimit,
          isFile,
          placeholder,
          optional,
          isDescription,
          urls,
        }) => {
          const onlyFileUpload = isFile ? !charLimit && !placeholder : false;

          return (
            <div key={question} className="flex flex-col">
              {isDescription && infoComponent}
              {(!!charLimit || onlyFileUpload) && (
                <Textarea
                  name={`common${id}`}
                  maxCount={charLimit || 0}
                  placeholder={
                    placeholder ||
                    (isFile
                      ? "링크로 제출할 경우, 이곳에 작성해주세요. (파일로 제출한 경우에는 '파일 제출'이라고 기재 후 제출해주세요.)"
                      : '')
                  }
                  extraInput={
                    isFile
                      ? fileInputComponent
                      : urls
                      ? linkInputComponent
                      : undefined
                  }
                  required={!optional}
                  onlyFileUpload={onlyFileUpload}
                >
                  {question}
                </Textarea>
              )}
            </div>
          );
        }
      )}
    </section>
  );
};

export default CommonSection;
