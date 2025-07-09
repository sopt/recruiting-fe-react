import { usePostQuestionsSave } from '@/pages/PostQuestion/hooks/quries';
import type { FilterState } from '@/pages/PostQuestion/hooks/useFilterReducer';
import type { qustionListTypes } from '@/pages/PostQuestion/types/form';
import { Button } from '@sopt-makers/ui';
import { useFormContext } from 'react-hook-form';

interface TemporarySaveButtonProps {
  filterState: FilterState;
  deleteQuestionIds: number[];
}

const TemporarySaveButton = ({
  filterState,
  deleteQuestionIds,
}: TemporarySaveButtonProps) => {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid, isDirty },
  } = useFormContext<qustionListTypes>();

  const { mutate: saveMutate } = usePostQuestionsSave();

  const handleQuetsionsSave = (data: qustionListTypes) => {
    const questions = data.questionList.map((question, index) => {
      return {
        id: question.id,
        questionOrder: index,
        part: filterState.part,
        content: question.content,
        isDescription: question.isDescription,
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

    saveMutate(requestData);
  };

  return (
    <Button
      type="button"
      variant="outlined"
      size="md"
      onClick={handleSubmit(handleQuetsionsSave)}
      disabled={isSubmitting || !isValid || !isDirty}
    >
      임시저장
    </Button>
  );
};

export default TemporarySaveButton;
