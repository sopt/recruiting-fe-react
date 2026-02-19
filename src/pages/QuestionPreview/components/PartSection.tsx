import { IS_SOPT } from '@/constants';
import { Part, SoptPart } from '@/pages/Application/\btypes';
import FileInput from '@/pages/QuestionPreview/components/FileInput';
import Info from '@/pages/QuestionPreview/components/Info';
import LinkInput from '@/pages/QuestionPreview/components/LinkInput';
import SelectBox from '@/pages/QuestionPreview/components/SelectBox';
import TextareaBox from '@/pages/QuestionPreview/components/TextareaBox';

interface PartSectionProps {
  isReview?: boolean;
  refCallback?: (elem: HTMLElement) => void;
  part?: string;
  partOptions?: Array<{ value: string; label: string }>;
  filteredQuestions?: Array<{
    question: string;
    charLimit?: number;
    id: number;
    urls?: string[];
    isFile?: boolean;
    placeholder?: string;
    optional?: boolean;
    isDescription?: boolean;
  }>;
  partQuestionsById?: Record<
    number,
    { answer: { answer: string; file?: File; fileName?: string } }
  >;
  onPartChange?: (part: string) => void;
}

const PartSection = ({
  refCallback,
  isReview = false,
  part,
  partOptions,
  filteredQuestions,
  partQuestionsById,

  onPartChange,
}: PartSectionProps) => {
  const defaultPart = IS_SOPT ? Object.values(SoptPart) : Object.values(Part);
  const defaultPartOptions = Object.values(defaultPart)
    .filter((value) => value !== '공통')
    .map((value) => ({
      value,
      label: value,
    }));

  return (
    <section
      ref={refCallback}
      id="partial"
      className="flex flex-col w-[72rem] gap-[5rem]"
    >
      <h2 className="w-[72rem] title_2_28_sb text-gray-950">파트별 질문</h2>
      <SelectBox
        defaultValue={part}
        label="지원파트"
        name="part"
        placeholder="지원하고 싶은 파트를 선택해주세요."
        options={partOptions || defaultPartOptions}
        size="lg"
        required
        disabled={isReview}
        onValueChange={onPartChange}
      />
      {filteredQuestions?.map(
        (
          {
            question,
            charLimit,
            id,
            urls,
            isFile,
            placeholder,
            optional,
            isDescription,
          },
          index
        ) => {
          const draftItem = partQuestionsById?.[id];
          const defaultValue = draftItem ? draftItem.answer.answer : '';
          const questionIndex =
            filteredQuestions
              .slice(0, index)
              .filter((question) => !question.isDescription).length + 1;

          return (
            <div key={question}>
              {isDescription && <Info value={question} />}
              {!isDescription && (
                <TextareaBox
                  name={`part${id}`}
                  defaultValue={defaultValue}
                  maxCount={charLimit || 0}
                  placeholder={placeholder || ''}
                  extraInput={
                    isFile ? (
                      <FileInput section="part" id={id} isReview={isReview} />
                    ) : urls ? (
                      <LinkInput urls={urls} />
                    ) : undefined
                  }
                  onlyFileUpload={isFile && !charLimit && !placeholder}
                  disabled
                  required={!optional}
                  questionIndex={questionIndex}
                >
                  {question}
                </TextareaBox>
              )}
            </div>
          );
        }
      )}
    </section>
  );
};

export default PartSection;
