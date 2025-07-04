import YbObRadioGroup from '@/components/YbObRadioGroup';
import type { Group } from '@/pages/Question/types';
import { SelectV2 } from '@sopt-makers/ui';
import { useState } from 'react';

const generations = Array.from({ length: 7 }, (_, i) =>
  String(i + 30),
).reverse();

const Filters = () => {
  const [group, setGroup] = useState<Group>('YB');

  return (
    <div className="flex gap-[1.6rem] my-[4.4rem]">
      <SelectV2.Root visibleOptions={7} type="text">
        <SelectV2.Trigger>
          <SelectV2.TriggerContent placeholder={generations[0]} />
        </SelectV2.Trigger>
        <SelectV2.Menu>
          {generations.map((gen) => (
            <SelectV2.MenuItem key={gen} option={{ label: gen, value: gen }} />
          ))}
        </SelectV2.Menu>
      </SelectV2.Root>

      <YbObRadioGroup group={group} setGroup={setGroup} />
    </div>
  );
};

export default Filters;
