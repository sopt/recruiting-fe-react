import { Button } from '@sopt-makers/ui';
import { useQueryClient } from '@tanstack/react-query';
import { useFormContext } from 'react-hook-form';

import { useDebouncedCallback } from '@/hooks/useDebounceCallback';
import { COMMON_QUESTION } from '@/pages/Application/constants';
import {
  QuestionKeys,
  usePostQuestionsSave,
} from '@/pages/PostQuestion/hooks/queries';
import type { FilterState } from '@/pages/PostQuestion/hooks/useFilterReducer';
import type { qustionListTypes } from '@/pages/PostQuestion/types/form';

interface TemporarySaveButtonProps {
  filterState: FilterState;
  deleteQuestionIds: number[];
  onActivatePreview: () => void;
}

const TemporarySaveButton = ({
  filterState,
  deleteQuestionIds,
  onActivatePreview,
}: TemporarySaveButtonProps) => {
  const {
    watch,
    reset,
    formState: { isDirty },
  } = useFormContext<qustionListTypes>();

  const { mutate: saveMutate } = usePostQuestionsSave();

  const queryClient = useQueryClient();

  const handleQuetsionsSave = () => {
    const questions = watch('questionList').map((question, index) => {
      return {
        id: question.id,
        questionOrder: index,
        part: filterState.part === COMMON_QUESTION ? null : filterState.part,
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

    saveMutate(requestData, {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: QuestionKeys.filteredList(
            filterState.season,
            filterState.group,
          ),
        });
        reset(watch());
        onActivatePreview();
      },
    });
  };

  const debouncedSave = useDebouncedCallback(handleQuetsionsSave);

  return (
    <Button
      type="button"
      variant="outlined"
      size="md"
      onClick={debouncedSave}
      disabled={!isDirty}
    >
      임시저장
    </Button>
  );
};

export default TemporarySaveButton;
