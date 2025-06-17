import { Arrange, Trash } from '@/assets/svg';
import { TextField } from '@sopt-makers/ui';

interface DescriptionBoxProps {
  onHasDescriptionChange: (bool: boolean) => void;
}

const DescriptionBox = ({ onHasDescriptionChange }: DescriptionBoxProps) => {
  return (
    <div className="flex flex-row items-center gap-[3.2rem]">
      <section className="flex flex-col gap-[2rem] px-[3.2rem] pb-[2rem] w-[78.4rem] border-1 border-gray500 rounded-xl bg-gray900">
        <div className="flex justify-center ">
          <Arrange width={24} />
        </div>

        <h2 className=" title_3_24_sb">
          설명글<span className="text-secondary">*</span>
        </h2>
        <TextField placeholder="설명을 입력하세요." />
      </section>

      <div className="flex flex-col gap-[1.4rem] w-[16.4rem]  rounded-xl p-[1.6rem] bg-gray700">
        <button
          type="button"
          onClick={() => onHasDescriptionChange(false)}
          className="flex gap-[0.8rem] px-[0.4rem] py-[0.3rem]  rounded-[8px] hover:bg-gray600 cursor-pointer"
        >
          <Trash width={24} height={24} />
          <span className="body_2_16_m">삭제</span>
        </button>
      </div>
    </div>
  );
};

export default DescriptionBox;
