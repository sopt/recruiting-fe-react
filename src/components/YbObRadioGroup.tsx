import type { GROUP } from '@/pages/Question/types';
import { Radio } from '@sopt-makers/ui';
import type { Dispatch, SetStateAction } from 'react';

interface YbObRadioGroupProps {
  group: GROUP;
  setGroup: Dispatch<SetStateAction<GROUP>>;
}

const YbObRadioGroup = ({ group, setGroup }: YbObRadioGroupProps) => {
  return (
    <div className="flex gap-[1.6rem]">
      <Radio
        size="lg"
        label="YB"
        checked={group === 'YB'}
        onChange={() => setGroup('YB')}
      />

      <Radio
        size="lg"
        label="OB"
        checked={group === 'OB'}
        onChange={() => setGroup('OB')}
      />
    </div>
  );
};

export default YbObRadioGroup;
