import { Button, Dialog, useDialog } from '@sopt-makers/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';
import { useDebouncedCallback } from '@/hooks/useDebounceCallback';
import { COMMON_QUESTION } from '@/pages/Application/constants';
import {
  QuestionKeys,
  usePostQuestionsRegister,
} from '@/pages/PostQuestion/hooks/queries';
import type { FilterState } from '@/pages/PostQuestion/hooks/useFilterReducer';
import type { qustionListTypes } from '@/pages/PostQuestion/types/form';

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
    watch,
    formState: { isSubmitting },
  } = useFormContext<qustionListTypes>();

  const { mutate: registerMutate } = usePostQuestionsRegister();

  const questionList = watch('questionList');

  const handleRegisterClick = () => {
    openDialog({
      title: '최종 등록을 진행하시겠어요?',
      description: (
        <div className="mb-[2rem] flex flex-col mt-[1.2rem] gap-[3.6rem]">
          <p className="whitespace-pre-line">
            최종 등록 후 질문 수정은 어드민팀에 문의해 주세요.
          </p>
          <Dialog.Footer align="right">
            <Button theme="black" onClick={closeDialog}>
              취소
            </Button>
            <Button
              type="button"
              theme="white"
              onClick={() => {
                handleSubmit(registQuestions)();
                closeDialog();
              }}
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
        part: filterState.part === COMMON_QUESTION ? null : filterState.part,
        content: question.content,
        isDescription: question.isDescription,
        charLimit: question.isAnswer ? question.charLimit : null,
        required: question.required,
        link: question.link,
        placeholder: question.isAnswer ? question.placeholder : null,
        isFile: question.isFile,
      };
    });

    const requestData = {
      season: filterState.season,
      group: filterState.group,
      questions: questions,
      deleteQuestionIdList: deleteQuestionIds,
    };

    closeDialog();

    registerMutate(requestData, {
      onSuccess: () =>
        queryClient.invalidateQueries({
          queryKey: QuestionKeys.filteredList(
            filterState.season,
            filterState.group,
          ),
        }),
    });
  };

  const debouncedRegisterClick = useDebouncedCallback(handleRegisterClick);

  return (
    <Button
      type="button"
      variant="fill"
      size="md"
      theme="blue"
      onClick={debouncedRegisterClick}
      disabled={isSubmitting || questionList[0]?.isActive}
    >
      최종 등록하기
    </Button>
  );
};

export default RegisterButton;
