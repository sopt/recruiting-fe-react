import { Part } from '@/pages/Application/\btypes';
import FileInput from '@/pages/PreviewForm/components/FileInput';
import Info from '@/pages/PreviewForm/components/Info';
import LinkInput from '@/pages/PreviewForm/components/LinkInput';
import SelectBox from '@/pages/PreviewForm/components/SelectBox';
import Textarea from '@/pages/PreviewForm/components/Textarea';

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
  const defaultPartOptions = Object.values(Part)
    .filter((value) => value !== '공통')
    .map((value) => ({
      value,
      label: value,
    }));

  return (
    <section
      ref={refCallback}
      id="partial"
      className="flex flex-col gap-[5rem]"
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

          return (
            <div key={question}>
              {isDescription && <Info value={question} />}
              {!isDescription && !isFile && (
                <Textarea
                  name={`part${id}`}
                  defaultValue={defaultValue}
                  maxCount={charLimit || 0}
                  placeholder={placeholder || ''}
                  extraInput={urls ? <LinkInput urls={urls} /> : undefined}
                  disabled
                  required={!optional}
                  questionIndex={index + 1}
                >
                  {question}
                </Textarea>
              )}
              {!isDescription && isFile && (
                <div className="flex flex-col gap-[0.8rem] items-center">
                  <h4 className="w-[72rem] title_5_18_sb whitespace-pre-line break-words">
                    <span className="cursor-pointer text-gray-950">
                      <span>
                        {index + 1}. {question}
                        {!optional && (
                          <span className="relative">
                            <i className="absolute bottom-[5px] inline-block rounded-full w-[8px] h-[8px] bg-gray-950 translate-x-[5px] translate-y-[-2px]" />
                          </span>
                        )}
                      </span>
                    </span>
                  </h4>
                  <FileInput section="part" id={id} isReview={isReview} />
                </div>
              )}
            </div>
          );
        }
      )}
    </section>
  );
};

export default PartSection;
