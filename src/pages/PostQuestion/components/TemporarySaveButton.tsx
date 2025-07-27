import { useDebouncedCallback } from "@/hooks/useDebounceCallback";
import { usePostQuestionsSave } from "@/pages/PostQuestion/hooks/quries";
import type { FilterState } from "@/pages/PostQuestion/hooks/useFilterReducer";
import type { qustionListTypes } from "@/pages/PostQuestion/types/form";
import { Button } from "@sopt-makers/ui";
import { useQueryClient } from "@tanstack/react-query";
import { useFormContext } from "react-hook-form";

interface TemporarySaveButtonProps {
  filterState: FilterState;
  deleteQuestionIds: number[];
}

const TemporarySaveButton = ({
  filterState,
  deleteQuestionIds,
}: TemporarySaveButtonProps) => {
  const {
    watch,
    formState: { isDirty },
  } = useFormContext<qustionListTypes>();

  const { mutate: saveMutate } = usePostQuestionsSave();

  const queryClient = useQueryClient();

  const handleQuetsionsSave = () => {
    const questions = watch("questionList").map((question, index) => {
      return {
        id: question.id,
        questionOrder: index,
        part: filterState.part === "ALL" ? null : filterState.part,
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
          queryKey: ["question", "list", filterState.season, filterState.group],
        });
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
