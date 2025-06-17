import { Arrange, InfoCircle } from '@/assets/svg';
import { TextField } from '@sopt-makers/ui';

const ManageQuestion = () => {
  return (
    <section className="flex flex-col gap-[2rem] px-[3.2rem] pb-[2rem] max-w-[78.4rem] border-1 border-gray500 rounded-xl bg-gray900">
      <div className="flex justify-center ">
        <Arrange width={24} />
      </div>
      <h2 className=" title_3_24_sb">
        질문 1<span className="text-secondary">*</span>
      </h2>
      <TextField placeholder="질문을 작성하세요." />

      <hr className="border-gray700" />

      <TextField
        labelText="주관식 답변 플레이스 홀더"
        placeholder="내용을 작성해주세요."
        required
      />
      <div className="flex justify-end">
        <p className="flex gap-[0.2rem] items-center label_4_12_sb text-gray30">
          플레이스 홀더 설정이 궁금해요. <InfoCircle width={15} />
        </p>
      </div>

      <hr className="border-gray700" />

      <TextField
        labelText="최대 글자수"
        placeholder="최대 글자수를 입력하세요."
        descriptionText="숫자만 입력하세요. (ex. 700)"
        required
      />
    </section>
  );
};

export default ManageQuestion;
