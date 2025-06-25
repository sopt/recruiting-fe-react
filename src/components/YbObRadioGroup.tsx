import type { GRADE } from '@/pages/PostQuestion/types';
import { Radio } from '@sopt-makers/ui';
import { useState } from 'react';

const YbObRadioGroup = () => {
  const [grade, setGrade] = useState<GRADE>('YB');

  const handleGradeChange = (grade: GRADE) => {
    setGrade(grade);
  };

  return (
    <div className="flex gap-[1.6rem]">
      <Radio
        size="lg"
        label="YB"
        checked={grade === 'YB'}
        onClick={() => handleGradeChange('YB')}
      />

      <Radio
        size="lg"
        label="OB"
        checked={grade === 'OB'}
        onClick={() => handleGradeChange('OB')}
      />
    </div>
  );
};

export default YbObRadioGroup;
