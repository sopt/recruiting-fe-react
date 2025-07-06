import { Add, Arrange, Check, InfoCircle, Link, Trash } from '@/assets/svg';
import { CheckBox, TextField, Toggle } from '@sopt-makers/ui';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface QuestionBoxProps {
  index: number;
  deleteQuestion: () => void;
}

const QuestionBox = ({ index, deleteQuestion }: QuestionBoxProps) => {
  const [isRequiredQustion, setIsRequiredQuestion] = useState(false);
  const [hasLink, setHasLink] = useState(false);
  const [hasFileUpload, setHasFileUpload] = useState(false);

  const { register, watch } = useFormContext();

  const fileField = watch(`questionList.${index}.file`);
  const fileName = fileField?.[0]?.name ?? '';

  return (
    <li className="flex flex-row items-center gap-[3.2rem]">
      <div className="flex flex-col gap-[2rem] px-[3.2rem] pb-[2rem] w-[78.4rem] border-1 border-gray500 rounded-xl bg-gray900">
        <div className="flex justify-center ">
          <Arrange width={24} />
        </div>

        <h2 className=" title_3_24_sb">
          {isRequiredQustion && (
            <p className="label_4_12_sb text-secondary">*필수질문</p>
          )}
          {`질문 ${index + 1}`}
          <span className="text-secondary">*</span>
        </h2>
        <TextField
          placeholder="질문을 작성하세요."
          {...register(`questionList.${index}.question`)}
        />

        {hasLink && (
          <TextField
            labelText="링크 첨부"
            placeholder="이동할 링크를 입력하세요."
            rightAddon={<Link width={24} className="stroke-gray500" />}
            required
            {...register(`questionList.${index}.link`)}
          />
        )}

        <hr className="border-gray700" />

        <TextField
          labelText="주관식 답변 플레이스 홀더"
          placeholder="내용을 작성해주세요."
          required
          {...register(`questionList.${index}.placeholder`)}
        />
        <div className="flex justify-end">
          <p className="flex gap-[0.2rem] items-center label_4_12_sb text-gray30">
            플레이스 홀더 설정이 궁금해요. <InfoCircle width={15} />
          </p>
        </div>

        {hasFileUpload && (
          <label className="flex flex-col gap-[0.8rem] label_3_14_sb ">
            파일 업로드
            <div className="flex justify-between py-[1.1rem] px-[2.2rem] w-full rounded-2xl bg-gray800">
              <div className="flex gap-[2.4rem]">
                {fileName !== '' ? (
                  <span className="body_2_16_m text-gray-10">{fileName}</span>
                ) : (
                  <>
                    <span className="body_2_16_m text-gray-600">
                      파일업로드
                    </span>
                    <span className="body_2_16_m text-gray-500">
                      50mb 이하 | pdf,pptx
                    </span>
                  </>
                )}
              </div>
              <input
                className="hidden"
                type="file"
                {...register(`questionList.${index}.file`)}
              />
              <div className="flex items-center justify-center p-[0.6rem] rounded-md bg-gray600">
                <Add width={15} />
              </div>
            </div>
          </label>
        )}
        <hr className="border-gray700" />

        <div className="w-[26.8rem]">
          <TextField
            labelText="최대 글자수"
            placeholder="최대 글자수를 입력하세요."
            descriptionText="숫자만 입력하세요. (ex. 700)"
            required
            {...register(`questionList.${index}.maxText`, {
              valueAsNumber: true,
            })}
          />
        </div>
      </div>

      <div className="flex flex-col gap-[1.4rem] w-[16.4rem]  rounded-xl p-[1.6rem] bg-gray700">
        <h4 className="label_3_14_sb text-gray100">질문 설정</h4>
        <div className="flex justify-between">
          <span className="body_2_16_m">* 필수질문</span>
          <Toggle
            size="lg"
            checked={isRequiredQustion}
            onClick={() => setIsRequiredQuestion((prev) => !prev)}
          />
        </div>
        <div className="flex justify-between">
          <span className="flex gap-[0.8rem] body_2_16_m">
            <Link width={16} className="stroke-gray10" /> 링크
          </span>
          <Toggle
            size="lg"
            checked={hasLink}
            onClick={() => setHasLink((prev) => !prev)}
          />
        </div>

        <hr className="border-gray400" />

        <h4 className="label_3_14_sb text-gray100">답변 필드</h4>
        <div className="flex flex-row items-center gap-[1rem]">
          <label className="rounded-[5px] p-[0.3rem] bg-gray600">
            <input type="checkbox" className="hidden" checked disabled />
            <Check width={16} className="stroke-gray400" />
          </label>
          <span className="body_2_16_m text-gray300">주관식</span>
        </div>
        <div className="flex flex-row items-center gap-[1rem]">
          <CheckBox
            size="lg"
            checked={hasFileUpload}
            onClick={() => setHasFileUpload((prev) => !prev)}
          />
          <span className="body_2_16_m ">파일 업로드</span>
        </div>

        <hr className="border-gray400" />

        <button
          type="button"
          onClick={deleteQuestion}
          className="flex gap-[0.8rem] px-[0.4rem] py-[0.5rem]  rounded-[8px] hover:bg-gray600 cursor-pointer"
        >
          <Trash width={24} height={24} />
          <span className="body_2_16_m">삭제</span>
        </button>
      </div>
    </li>
  );
};

export default QuestionBox;
