import { TextArea, useToast } from '@sopt-makers/ui';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Trash } from '@/assets/svg';

interface DescriptionBoxProps {
  deleteDescription: () => void;
}

const DescriptionBox = ({ deleteDescription }: DescriptionBoxProps) => {
  const { open: openToast } = useToast();

  const { watch, control } = useFormContext();

  const isActive = watch(`questionList.${0}.isActive`);
  const content = watch(`questionList.${0}.content`);

  useEffect(() => {
    const textareas = document.querySelectorAll('textarea');
    if (textareas) {
      for (const textarea of textareas) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  }, [content]);

  const handleDescriptionDelete = () => {
    openToast({
      icon: 'error',
      content: '삭제한 내용은 저장해야 최종 반영돼요.',
    });
    deleteDescription();
  };

  return (
    <div className="flex flex-row items-center gap-[3.2rem] mb-[1.2rem]">
      <section
        className={`flex flex-col gap-[2rem] px-[3.2rem] py-[2rem] border-1 border-gray500 rounded-xl  ${
          isActive ? 'py-[2rem] bg-background w-full' : 'bg-gray900 w-[78.4rem]'
        }`}
      >
        <h2 className=" title_3_24_sb">
          설명글<span className="text-secondary">*</span>
        </h2>
        <Controller
          control={control}
          name={'questionList.0.content'}
          render={({ field }) => (
            <TextArea
              {...field}
              disabled={isActive}
              className="custom-question-textArea"
              placeholder="설명을 입력하세요."
            />
          )}
        />
      </section>

      {!isActive && (
        <div className="flex flex-col gap-[1.4rem] w-[16.4rem] rounded-xl p-[1.6rem] bg-gray700">
          <button
            type="button"
            onClick={handleDescriptionDelete}
            className="flex gap-[0.8rem] px-[0.4rem] py-[0.3rem] rounded-[8px] hover:bg-gray600 cursor-pointer"
          >
            <Trash width={24} height={24} />
            <span className="body_2_16_m">삭제</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default DescriptionBox;
