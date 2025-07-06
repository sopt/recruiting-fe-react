import type { GROUP } from '@/pages/PostQuestion/types';
import { Radio } from '@sopt-makers/ui';

interface YbObRadioGroupProps {
  group: GROUP;
  setGroup: (group: GROUP) => void;
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
