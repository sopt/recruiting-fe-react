import { usePostQuestionsSave } from '@/pages/PostQuestion/hooks/quries';
import type { Group, PartName } from '@/pages/PostQuestion/types';
import type { qustionListTypes } from '@/pages/PostQuestion/types/form';
import { Button } from '@sopt-makers/ui';
import { useFormContext } from 'react-hook-form';

interface TemporarySaveButtonProps {
  selectedPart: PartName;
  selectedGroup: Group;
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
        id: question.id,
        questionOrder: index,
        part: selectedPart as PartName,
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
