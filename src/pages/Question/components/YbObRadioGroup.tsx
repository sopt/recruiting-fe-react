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
        label="yb"
        checked={group === 'YB'}
        onClick={() => setGroup('YB')}
      />

      <Radio
        size="lg"
        label="ob"
        checked={group === 'OB'}
        onClick={() => setGroup('OB')}
      />
    </div>
  );
};

export default YbObRadioGroup;
