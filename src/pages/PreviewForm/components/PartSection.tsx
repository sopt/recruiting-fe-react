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
        ({
          question,
          charLimit,
          id,
          urls,
          isFile,
          placeholder,
          optional,
          isDescription,
        }) => {
          const draftItem = partQuestionsById?.[id];
          const defaultValue = draftItem ? draftItem.answer.answer : '';
          const onlyFileUpload = isFile ? !charLimit && !placeholder : false;

          return (
            <div key={question}>
              {isDescription && <Info value={question} />}
              {!isDescription && (
                <Textarea
                  name={`part${id}`}
                  defaultValue={defaultValue}
                  maxCount={charLimit || 0}
                  placeholder={
                    placeholder ||
                    (isFile
                      ? "링크로 제출할 경우, 이곳에 작성해주세요. (파일로 제출한 경우에는 '파일 제출'이라고 기재 후 제출해주세요.)"
                      : '')
                  }
                  extraInput={
                    isFile ? (
                      <FileInput section="part" id={id} isReview={isReview} />
                    ) : urls ? (
                      <LinkInput urls={urls} />
                    ) : undefined
                  }
                  disabled
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

export default PartSection;
