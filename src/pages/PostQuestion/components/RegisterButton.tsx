import { usePostQuestionsRegister } from '@/pages/PostQuestion/hooks/quries';
import type { FilterState } from '@/pages/PostQuestion/hooks/useFilterReducer';
import type { qustionListTypes } from '@/pages/PostQuestion/types/form';
import { Button, Dialog, useDialog } from '@sopt-makers/ui';
import { useQueryClient } from '@tanstack/react-query';
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

  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useFormContext<qustionListTypes>();

  const { mutate: registerMutate } = usePostQuestionsRegister();

  const handleRegisterClick = () => {
    openDialog({
      title: '최종 등록을 진행하시겠어요?',
      description: (
        <div className="mb-[2rem] flex flex-col mt-[1.2rem] gap-[3.6rem]">
          <p className="whitespace-pre-line">
            {'최종 등록 후 질문 수정이 불가능해요.'}
          </p>
          <Dialog.Footer align="right">
            <Button theme="black" onClick={closeDialog}>
              취소
            </Button>
            <Button theme="white" onClick={() => handleSubmit(registQuestions)}>
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
        part: filterState.part,
        content: question.content,
        isDescription: false,
        charLimit: question.charLimit,
        required: question.required,
        link: question.link,
        placeholder: question.placeholder,
        isFile: true,
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
  };

  return (
    <Button
      type="button"
      variant="fill"
      size="md"
      onClick={handleRegisterClick}
      disabled={isSubmitting || !isValid}
    >
      최종 등록하기
    </Button>
  );
};

export default RegisterButton;
