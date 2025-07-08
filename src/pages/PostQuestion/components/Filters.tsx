import YbObRadioGroup from '@/pages/PostQuestion/components/YbObRadioGroup';
import type { Group } from '@/pages/PostQuestion/types';
import { SelectV2 } from '@sopt-makers/ui';

const generations = Array.from({ length: 7 }, (_, i) =>
  String(i + 30),
).reverse();

interface FiltersProps {
  selectedGroup: Group;
  handleGroupChange: (group: Group) => void;
  handleSeasonChange: (season: number) => void;
}

const Filters = ({
  selectedGroup,
  handleGroupChange,
  handleSeasonChange,
}: FiltersProps) => {
  return (
    <div className="flex gap-[1.6rem] my-[4.4rem]">
      <SelectV2.Root visibleOptions={7} type="text">
        <SelectV2.Trigger>
          <SelectV2.TriggerContent placeholder={generations[0]} />
        </SelectV2.Trigger>
        <SelectV2.Menu>
          {generations.map((gen) => (
            <SelectV2.MenuItem
              key={gen}
              option={{ label: gen, value: gen }}
              onClick={() => handleSeasonChange(+gen)}
            />
          ))}
        </SelectV2.Menu>
      </SelectV2.Root>

      <YbObRadioGroup group={selectedGroup} setGroup={handleGroupChange} />
    </div>
  );
};

export default Filters;
