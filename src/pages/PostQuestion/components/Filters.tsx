import { useGetGeneration } from '@/pages/PostGeneration/hooks/queries';
import YbObRadioGroup from '@/pages/PostQuestion/components/YbObRadioGroup';
import type { FilterState } from '@/pages/PostQuestion/hooks/useFilterReducer';
import type { Group } from '@/pages/PostQuestion/types';

import { SelectV2 } from '@sopt-makers/ui';
import { useRef } from 'react';

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
  const initialRef = useRef(true);

  const { data: generationData, isSuccess } = useGetGeneration(
    filterState.group,
  );

  const generations = generationData?.seasons
    .map((season) => season.season)
    .sort((a, b) => b - a)
    .map(String);

  if (initialRef.current && isSuccess && generations) {
    handleSeasonChange(+generations[0]);
    initialRef.current = false;
  }

  return (
    <div className="flex gap-[1.6rem] my-[4.4rem]">
      <SelectV2.Root visibleOptions={7} type="text">
        <SelectV2.Trigger>
          <SelectV2.TriggerContent placeholder={generations?.[0]} />
        </SelectV2.Trigger>
        <SelectV2.Menu>
          {generations?.map((gen) => (
            <SelectV2.MenuItem
              key={gen}
              option={{ label: gen, value: gen }}
              onClick={() => handleSeasonChange(+gen)}
            />
          ))}
        </SelectV2.Menu>
      </SelectV2.Root>

      <YbObRadioGroup group={filterState.group} setGroup={handleGroupChange} />
    </div>
  );
};

export default Filters;
