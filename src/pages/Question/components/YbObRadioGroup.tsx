import type { GRADE } from '@/pages/Question/types';
import { Radio } from '@sopt-makers/ui';
import { useState } from 'react';

const YbObRadioGroup = () => {
  const [grade, setGrade] = useState<GRADE>('yb');

  const handleGradeChange = (grade: GRADE) => {
    setGrade(grade);
  };

  return (
    <div className="flex gap-[1.6rem]">
      <Radio
        size="lg"
        label="yb"
        checked={grade === 'yb'}
        onClick={() => handleGradeChange('yb')}
      />

      <Radio
        size="lg"
        label="ob"
        checked={grade === 'ob'}
        onClick={() => handleGradeChange('ob')}
      />
    </div>
  );
};

export default YbObRadioGroup;
