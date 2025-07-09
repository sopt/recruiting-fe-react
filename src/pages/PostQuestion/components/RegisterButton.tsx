import { usePostQuestionsRegister } from '@/pages/PostQuestion/hooks/quries';
import type { FilterState } from '@/pages/PostQuestion/hooks/useFilterReducer';
import type { qustionListTypes } from '@/pages/PostQuestion/types/form';
import { Button } from '@sopt-makers/ui';
import { useFormContext } from 'react-hook-form';

interface RegisterButtonProps {
  filterState: FilterState;
  deleteQuestionIds: number[];
}

const RegisterButton = ({
  filterState,
  deleteQuestionIds,
}: RegisterButtonProps) => {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext<qustionListTypes>();

  const { mutate: registerMutate } = usePostQuestionsRegister();

  const handleQuetsionsRegister = (data: qustionListTypes) => {
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

    registerMutate(requestData);
  };

  return (
    <Button
      type="button"
      variant="fill"
      size="md"
      onClick={handleSubmit(handleQuetsionsRegister)}
      disabled={isSubmitting || !isValid || !isDirty}
    >
      최종 등록하기
    </Button>
  );
};

export default RegisterButton;
