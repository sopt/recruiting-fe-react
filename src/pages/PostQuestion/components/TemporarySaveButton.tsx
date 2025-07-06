import { usePostQuestionsSave } from '@/pages/PostQuestion/hooks/quries';
import type { GROUP, PART_NAME } from '@/pages/PostQuestion/types';
import type { qustionListTypes } from '@/pages/PostQuestion/types/form';
import { Button } from '@sopt-makers/ui';
import { useFormContext } from 'react-hook-form';

interface TemporarySaveButtonProps {
  selectedPart: PART_NAME;
  selectedGroup: GROUP;
  selectedSeason: number;
}

const TemporarySaveButton = ({
  selectedPart,
  selectedGroup,
  selectedSeason,
}: TemporarySaveButtonProps) => {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useFormContext<qustionListTypes>();

  const { mutate: saveMutate } = usePostQuestionsSave();

  const handleQuetsionsSave = (data: qustionListTypes) => {
    const questions = data.questionList.map((question, index) => {
      return {
        id: index + 1,
        questionOrder: index + 1,
        part: selectedPart as PART_NAME,
        content: question.question,
        isDescription: false,
        charLimit: question.charLimit,
        required: true,
        link: question.link,
        placeholder: question.placeholder,
        isFile: true,
      };
    });

    const requestData = {
      season: selectedSeason,
      group: selectedGroup,
      questions: questions,
      deleteQuestionIdList: [],
    };

    saveMutate(requestData);
  };

  return (
    <Button
      type="button"
      variant="outlined"
      size="md"
      onClick={handleSubmit(handleQuetsionsSave)}
      disabled={isSubmitting || !isValid}
    >
      임시저장
    </Button>
  );
};

export default TemporarySaveButton;
