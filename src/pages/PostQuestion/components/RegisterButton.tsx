import { useDebouncedCallback } from '@/hooks/useDebounceCallback';
import { usePostQuestionsRegister } from '@/pages/PostQuestion/hooks/quries';
import type { FilterState } from '@/pages/PostQuestion/hooks/useFilterReducer';
import type { qustionListTypes } from '@/pages/PostQuestion/types/form';
import { Button, Dialog, useDialog } from '@sopt-makers/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';

interface RegisterButtonProps {
  filterState: FilterState;
  deleteQuestionIds: number[];
}

const RegisterButton = ({
  filterState,
  deleteQuestionIds,
}: RegisterButtonProps) => {
  const { open: openDialog, close: closeDialog } = useDialog();

  const [isSaving, setIsSaving] = useState(false);

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    watch,
    formState: { isSubmitting, isValid },
  } = useFormContext<qustionListTypes>();

  const { mutate: registerMutate } = usePostQuestionsRegister();

  const questionList = watch('questionList');

  const handleRegisterClick = () => {
    setIsSaving(true);
    openDialog({
      title: '최종 등록을 진행하시겠어요?',
      description: (
        <div className="mb-[2rem] flex flex-col mt-[1.2rem] gap-[3.6rem]">
          <p className="whitespace-pre-line">
            최종 등록 후 질문 수정이 불가능해요.
          </p>
          <Dialog.Footer align="right">
            <Button theme="black" onClick={closeDialog}>
              취소
            </Button>
            <Button
              type="button"
              theme="white"
              onClick={() => handleSubmit(registQuestions)()}
            >
              최종 등록
            </Button>
          </Dialog.Footer>
        </div>
      ),
    });
  };

  const registQuestions = (data: qustionListTypes) => {
    const questions = data.questionList.map((question, index) => {
      return {
        id: question.id,
        questionOrder: index,
        part: filterState.part === '공통' ? null : filterState.part,
        content: question.content,
        isDescription: question.isDescription,
        charLimit: question.charLimit,
        required: question.required,
        link: question.link,
        placeholder: question.placeholder,
        isFile: question.isFile,
      };
    });

    const requestData = {
      season: filterState.season,
      group: filterState.group,
      questions: questions,
      deleteQuestionIdList: deleteQuestionIds,
    };

    registerMutate(requestData, {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: ['question', 'list', filterState.season, filterState.group],
        }),
    });
    closeDialog();
    setIsSaving(false);
  };

  const debouncedRegisterClick = useDebouncedCallback(handleRegisterClick);

  return (
    <Button
      type="button"
      variant="fill"
      size="md"
      onClick={debouncedRegisterClick}
      disabled={
        isSubmitting || isSaving || !isValid || questionList[0]?.isActive
      }
    >
      최종 등록하기
    </Button>
  );
};

export default RegisterButton;
