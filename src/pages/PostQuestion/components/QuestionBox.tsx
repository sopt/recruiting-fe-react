import { IconXClose } from '@sopt-makers/icons';
import {
  Button,
  CheckBox,
  TextArea,
  TextField,
  Toggle,
  useToast,
} from '@sopt-makers/ui';
import { useEffect } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Add, Arrange, InfoCircle, Link, Trash } from '@/assets/svg';
import Tooltip from '@/components/Tooltip';
import type { qustionListTypes } from '@/pages/PostQuestion/types/form';

interface QuestionBoxProps {
  index: number;
  deleteQuestion: () => void;
  hasDescription: boolean;
}

const QuestionBox = ({
  index,
  deleteQuestion,
  hasDescription,
}: QuestionBoxProps) => {
  const { open: openToast } = useToast();

  const {
    register,
    watch,
    control,
    setValue,
    formState: { errors },
  } = useFormContext<qustionListTypes>();

  const isLink = watch(`questionList.${index}.isLink`);
  const isFile = watch(`questionList.${index}.isFile`);
  const required = watch(`questionList.${index}.required`);
  const isActive = watch(`questionList.${index}.isActive`);
  const content = watch(`questionList.${index}.content`);
  const isAnswer = watch(`questionList.${index}.isAnswer`);

  useEffect(() => {
    const textareas = document.querySelectorAll('textarea');
    if (textareas) {
      for (const textarea of textareas) {
        textarea.style.height = 'auto';
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  }, [content]);

  useEffect(() => {
    if (!isFile && !isAnswer) {
      setValue(`questionList.${index}.isAnswer`, true);
    }
  }, [isFile]);

  useEffect(() => {
    if (isActive) return;

    if (isAnswer) {
      const currentPlaceholder = watch(`questionList.${index}.placeholder`);
      if (!currentPlaceholder || currentPlaceholder.trim() === '') {
        setValue(`questionList.${index}.placeholder`, '내용을 작성해주세요.');
      }
    } else {
      setValue(`questionList.${index}.placeholder`, null);
      setValue(`questionList.${index}.charLimit`, null);
    }
  }, [isAnswer]);

  const handleDeleteQuestionClick = () => {
    deleteQuestion();
    openToast({
      icon: 'error',
      content: '삭제한 내용은 저장해야 최종 반영돼요.',
    });
  };

  return (
    <li>
      <article className="flex flex-row items-center gap-[3.2rem]">
        <section
          className={`flex flex-col gap-[2rem] px-[3.2rem] pb-[2rem]  border-1 border-gray500 rounded-xl  ${
            isActive
              ? 'py-[2rem] bg-background w-full'
              : ' bg-gray900 w-[78.4rem]'
          }`}
        >
          {!isActive && (
            <div className="flex justify-center ">
              <Arrange width={24} />
            </div>
          )}

          <div className="flex justify-between">
            <h2 className="flex items-center title_3_24_sb">
              {`질문 ${index + (hasDescription ? 0 : 1)}`}
              {required && (
                <span className="title_24_sb text-secondary">*</span>
              )}
            </h2>

            {!isActive && (
              <div className="flex items-center gap-[0.8rem]">
                <span className="body_2_16_m">* 필수질문</span>
                <Controller
                  control={control}
                  name={`questionList.${index}.required`}
                  render={({ field: { onChange, value } }) => (
                    <Toggle
                      onClick={() => {
                        onChange(!value);
                        if (value === false) {
                          const currentPlaceholder = watch(
                            `questionList.${index}.placeholder`,
                          );
                          if (
                            !currentPlaceholder ||
                            currentPlaceholder.trim() === ''
                          ) {
                            setValue(
                              `questionList.${index}.placeholder`,
                              '내용을 작성해주세요.',
                            );
                          }
                        }
                      }}
                      checked={value}
                    />
                  )}
                />
              </div>
            )}
          </div>

          <Controller
            control={control}
            name={`questionList.${index}.content`}
            render={({ field }) => (
              <TextArea
                {...field}
                disabled={isActive}
                className="custom-question-textArea"
                placeholder="질문을 작성하세요."
                isError={!!errors.questionList?.[index]?.content}
                errorMessage={errors.questionList?.[index]?.content?.message}
              />
            )}
          />

          {isLink ? (
            <div className="relative">
              <div className="absolute flex justify-end w-full">
                <div className="flex gap-[0.2rem] items-center label_4_12_sb text-gray30">
                  링크 첨부가 궁금해요.
                  <Tooltip.Root>
                    <Tooltip.Trigger>
                      <InfoCircle width={15} />
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <div>
                        <div className="flex flex-row gap-[0.8rem] align-middle">
                          <InfoCircle width={16} />
                          <span className="title_7_14_sb">링크 첨부</span>
                        </div>
                        <p className="body_4_13_m mt-[0.8rem] mb-[2.4rem]">
                          지원자가 참고할 링크를 첨부할 때 사용해요.
                        </p>
                        <img
                          src="/image/link.png"
                          alt="미리보기 툴팁"
                          className="w-[35.2rem] h-[9.2rem] rounded-[10px]"
                        />
                      </div>
                    </Tooltip.Content>
                  </Tooltip.Root>
                </div>
              </div>
              <TextField
                labelText="링크 첨부"
                placeholder="이동할 링크를 입력하세요."
                rightAddon={
                  !isActive && (
                    <IconXClose
                      style={{ width: 24, height: 24 }}
                      className="stroke-white cursor-pointer"
                      onClick={() =>
                        setValue(`questionList.${index}.isLink`, false)
                      }
                    />
                  )
                }
                disabled={isActive}
                className="custom-textField"
                isError={!!errors.questionList?.[index]?.link}
                errorMessage={errors.questionList?.[index]?.link?.message}
                {...register(`questionList.${index}.link`)}
              />
            </div>
          ) : (
            !isActive && (
              <Button
                theme="black"
                variant="fill"
                size="sm"
                rounded="lg"
                onClick={() => setValue(`questionList.${index}.isLink`, true)}
                LeftIcon={() => <Link stroke="white" width={16} height={16} />}
                className="w-[10.4rem]"
              >
                링크 첨부하기
              </Button>
            )
          )}

          <hr className="border-gray700" />

          {isAnswer && (
            <div className="relative">
              <div className="absolute flex justify-end w-full">
                <div className="flex gap-[0.2rem] items-center label_4_12_sb text-gray30">
                  플레이스 홀더 설정이 궁금해요.
                  <Tooltip.Root>
                    <Tooltip.Trigger>
                      <InfoCircle width={15} />
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <div>
                        <div className="flex flex-row gap-[0.8rem] align-middle">
                          <InfoCircle width={16} />
                          <span className="title_7_14_sb">
                            플레이스 홀더 설정
                          </span>
                        </div>
                        <p className="body_4_13_m mt-[0.8rem] mb-[2.4rem]">
                          지원자에게 보다 명확한 안내를 위해 사용하는
                          텍스트에요.
                        </p>
                        <img
                          src="/image/placeholder.png"
                          alt="미리보기 툴팁"
                          className="w-[35.2rem] h-[9.2rem] rounded-[10px]"
                        />
                      </div>
                    </Tooltip.Content>
                  </Tooltip.Root>
                </div>
              </div>
              <TextField
                labelText="주관식 답변 플레이스 홀더"
                placeholder="내용을 작성해주세요."
                disabled={isActive}
                className="custom-textField"
                isError={!!errors.questionList?.[index]?.placeholder}
                errorMessage={
                  errors.questionList?.[index]?.placeholder?.message
                }
                {...register(`questionList.${index}.placeholder`)}
              />
            </div>
          )}

          {isFile && (
            <div className="relative">
              <div className="absolute flex justify-end w-full">
                <div className="flex gap-[0.2rem] items-center label_4_12_sb text-gray30">
                  파일 업로드가 뭔지 궁금해요.
                  <Tooltip.Root>
                    <Tooltip.Trigger>
                      <InfoCircle width={15} />
                    </Tooltip.Trigger>
                    <Tooltip.Content>
                      <div>
                        <div className="flex flex-row gap-[0.8rem] align-middle">
                          <InfoCircle width={16} />
                          <span className="title_7_14_sb">
                            파일 업로드 필드
                          </span>
                        </div>
                        <p className="body_4_13_m mt-[0.8rem] mb-[2.4rem]">
                          지원자에게 참고 자료를 받을 때 사용하는 필드에요.
                        </p>
                        <img
                          src="/image/file.png"
                          alt="미리보기 툴팁"
                          className="w-[35.2rem] h-[9.2rem] rounded-[10px]"
                        />
                      </div>
                    </Tooltip.Content>
                  </Tooltip.Root>
                </div>
              </div>
              <div className="flex flex-col gap-[0.8rem] label_3_14_sb ">
                파일 업로드
                <div className="flex justify-between py-[1.1rem] px-[2.2rem] w-full rounded-2xl bg-gray800">
                  <div className="flex gap-[2.4rem]">
                    <>
                      <span className="body_2_16_m text-gray-600">
                        파일업로드
                      </span>
                      <span className="body_2_16_m text-gray-500">
                        50mb 이하 | pdf
                      </span>
                    </>
                  </div>

                  <div className="flex items-center justify-center p-[0.6rem] rounded-md bg-gray600">
                    <Add width={15} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {!isFile && <hr className="border-gray700" />}

          {isAnswer && (
            <div className="w-[26.8rem]">
              <TextField
                labelText="최대 글자수"
                placeholder="최대 글자수를 입력하세요."
                descriptionText="숫자만 입력하세요. (ex. 700)"
                disabled={isActive}
                className="custom-textField"
                isError={!!errors.questionList?.[index]?.charLimit}
                errorMessage={errors.questionList?.[index]?.charLimit?.message}
                {...register(`questionList.${index}.charLimit`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          )}
        </section>

        {!isActive && (
          <div className="flex flex-col gap-[1.4rem] w-[16.4rem]  rounded-xl p-[1.6rem] bg-gray700">
            <div className="flex flex-row items-center gap-[1rem]">
              <div className="custom-checkbox">
                <CheckBox
                  size="lg"
                  checked={isAnswer}
                  disabled={!isFile}
                  onChange={(e) => {
                    if (!isFile) return;
                    const checked = e.target.checked;
                    setValue(`questionList.${index}.isAnswer`, checked);
                    if (!checked) {
                      setValue(`questionList.${index}.placeholder`, null);
                      setValue(`questionList.${index}.charLimit`, null);
                    }
                  }}
                />
              </div>
              <span
                className={`body_2_16_m ${
                  (!isFile || required) && 'text-gray300'
                }`}
              >
                주관식
              </span>
            </div>

            <div className="flex flex-row items-center gap-[1rem]">
              <Controller
                control={control}
                name={`questionList.${index}.isFile`}
                render={({ field: { value, onChange } }) => (
                  <CheckBox
                    size="lg"
                    checked={value}
                    onChange={(e) => {
                      onChange(e.target.checked);
                      if (e.target.checked) {
                        setValue(`questionList.${index}.isAnswer`, true);
                      }
                    }}
                  />
                )}
              />
              <span className="body_2_16_m ">파일 업로드</span>
            </div>

            <hr className="border-gray400" />

            <button
              type="button"
              onClick={handleDeleteQuestionClick}
              className="flex gap-[0.8rem] px-[0.4rem] py-[0.5rem]  rounded-[8px] hover:bg-gray600 cursor-pointer"
            >
              <Trash width={24} height={24} />
              <span className="body_2_16_m">삭제</span>
            </button>
          </div>
        )}
      </article>
    </li>
  );
};

export default QuestionBox;
