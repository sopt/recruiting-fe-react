import { Trash } from '@/assets/svg';
import { TextField, useToast } from '@sopt-makers/ui';
import { useFormContext } from 'react-hook-form';

interface DescriptionBoxProps {
  deleteDescription: () => void;
}

const DescriptionBox = ({ deleteDescription }: DescriptionBoxProps) => {
  const { open: openToast } = useToast();

  const { register, watch } = useFormContext();

  const isActive = watch('questionList.0.isActive');

  const handleDescriptionDelete = () => {
    openToast({
      icon: 'error',
      content: '삭제한 내용은 저장해야 최종 반영돼요.',
    });
    deleteDescription();
  };

  return (
    <div className="flex flex-row items-center gap-[3.2rem]">
      <section className="flex flex-col gap-[2rem] px-[3.2rem] py-[2rem] w-[78.4rem] border-1 border-gray500 rounded-xl bg-gray900">
        <h2 className=" title_3_24_sb">
          설명글<span className="text-secondary">*</span>
        </h2>
        <TextField
          placeholder="설명을 입력하세요."
          {...register('questionList.0.content')}
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
