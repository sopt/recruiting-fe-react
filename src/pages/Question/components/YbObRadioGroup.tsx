import type { GRADE } from '@/pages/Question/types';
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
				label="yb"
				checked={grade === 'YB'}
				onClick={() => handleGradeChange('YB')}
			/>

			<Radio
				size="lg"
				label="ob"
				checked={grade === 'OB'}
				onClick={() => handleGradeChange('OB')}
			/>
		</div>
	);
};

export default YbObRadioGroup;
