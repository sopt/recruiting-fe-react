import type { Group } from '@/pages/PostQuestion/types';
import { Radio } from '@sopt-makers/ui';

interface YbObRadioGroupProps {
  group: Group;
  onChange: (group: Group) => void;
}

const YbObRadioGroup = ({ group, onChange }: YbObRadioGroupProps) => {
  return (
    <div className="flex gap-[1.6rem]">
      <Radio
        size="lg"
        label="YB"
        checked={group === 'YB'}
        onChange={() => onChange('YB')}
      />

      <Radio
        size="lg"
        label="OB"
        checked={group === 'OB'}
        onChange={() => onChange('OB')}
      />
    </div>
  );
};

export default YbObRadioGroup;
