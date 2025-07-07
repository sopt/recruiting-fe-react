import { usePostQuestionsRegister } from '@/pages/PostQuestion/hooks/quries';
import type { GROUP, PART_NAME } from '@/pages/PostQuestion/types';
import type { qustionListTypes } from '@/pages/PostQuestion/types/form';
import { Button } from '@sopt-makers/ui';
import { useFormContext } from 'react-hook-form';

interface RegisterButtonProps {
  selectedPart: PART_NAME;
  selectedGroup: GROUP;
  selectedSeason: number;
}

const RegisterButton = ({
  selectedPart,
  selectedGroup,
  selectedSeason,
}: RegisterButtonProps) => {
  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = useFormContext<qustionListTypes>();

  const { mutate: registerMutate } = usePostQuestionsRegister();

  const handleQuetsionsRegister = (data: qustionListTypes) => {
    const questions = data.questionList.map((question, index) => {
      return {
        id: question.id,
        questionOrder: index,
        part: selectedPart as PART_NAME,
        content: question.question,
        isDescription: false,
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

    registerMutate(requestData);
  };

  return (
    <Button
      type="button"
      variant="fill"
      size="md"
      onClick={handleSubmit(handleQuetsionsRegister)}
      disabled={isSubmitting || !isValid}
    >
      최종 등록하기
    </Button>
  );
};

export default RegisterButton;
