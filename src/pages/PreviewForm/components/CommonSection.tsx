import type { ReactElement } from 'react';
import Textarea from './Textarea';

const QUESTIONS = [
  {
    id: 1,
    question:
      '지원자님이 생각하는 공유의 가치가 무엇인지, 지식 또는 경험을 공유하거나 공유받았던 경험을 토대로 서술해 주세요.',
    charLimit: 700,
    placeholder: '내용을 입력해주세요',
    isFile: true,
    optional: false,
    isDescription: true,
  },
  {
    id: 2,
    question:
      '지원자님의 의지로 시작한 도전 경험을 도전 계기와 과정, 그때 배운 점과 함께 구체적으로 설명해 주세요.',
    charLimit: 700,
    placeholder: '내용을 입력해주세요',
    isFile: false,
    optional: false,
    isDescription: false,
  },
  {
    id: 3,
    question:
      '팀원 간의 의사소통이 원활하게 되지 않거나, 서로를 신뢰하기 어려웠던 경험이 있으신가요? 그 상황을 어떻게 해결해 나갔는지 구체적으로 작성해 주세요.',
    charLimit: 700,
    placeholder: '내용을 입력해주세요',
    isFile: false,
    optional: false,
    isDescription: false,
  },
  {
    id: 4,
    question:
      '협업 시 팀원이 지원자님에 대해 표현한 말 중 가장 인상 깊었던 말을 말씀해 주시고, 그때의 상황과 인상 깊었던 이유를 설명해 주세요.',
    charLimit: 700,
    placeholder: '내용을 입력해주세요',
    isFile: false,
    optional: false,
    isDescription: false,
  },
];

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
  questions = QUESTIONS,
  infoComponent,
  fileInputComponent,
  linkInputComponent,
}: CommonSectionProps) => {
  return (
    <section id="common" className="flex flex-col gap-[5rem] w-[72rem]">
      <h2 className="w-[72rem] title_2_28_sb text-gray-950">공통 질문</h2>
      {questions.map(
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
