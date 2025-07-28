import YbObRadioGroup from "@/components/YbObRadioGroup";
import { useGetGeneration } from "@/pages/PostGeneration/hooks/queries";

import type { FilterState } from "@/pages/PostQuestion/hooks/useFilterReducer";
import type { Group } from "@/pages/PostQuestion/types";

import { SelectV2 } from "@sopt-makers/ui";
import { useEffect } from "react";

interface FiltersProps {
  filterState: FilterState;
  handleGroupChange: (group: Group) => void;
  handleSeasonChange: (season: number) => void;
}

const Filters = ({
  filterState,
  handleGroupChange,
  handleSeasonChange,
}: FiltersProps) => {
  const { data: generationData } = useGetGeneration(filterState.group);

  const generations = generationData?.seasons
    .map((season) => season.season)
    .sort((a, b) => b - a)
    .map(String);

  useEffect(() => {
    handleSeasonChange(+generations[0]);
  }, [filterState.group]);

  return (
    <div className="flex gap-[1.6rem] my-[4.4rem]">
      <SelectV2.Root visibleOptions={7} type="text">
        <SelectV2.Trigger>
          <SelectV2.TriggerContent
            placeholder={
              generations.length > 0
                ? `${generations?.[0]}기`
                : "기수를 등록해주세요"
            }
          />
        </SelectV2.Trigger>
        {generations.length > 0 ? (
          <SelectV2.Menu>
            {generations?.map((gen) => (
              <SelectV2.MenuItem
                key={gen}
                option={{ label: `${gen}기`, value: gen }}
                onClick={() => handleSeasonChange(+gen)}
              />
            ))}
          </SelectV2.Menu>
        ) : null}
      </SelectV2.Root>

      <YbObRadioGroup group={filterState.group} onChange={handleGroupChange} />
    </div>
  );
};

export default Filters;
