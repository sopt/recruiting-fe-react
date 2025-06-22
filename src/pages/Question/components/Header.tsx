import Filters from '@/pages/Question/components/Filters';
import { PART } from '@/pages/Question/constant';
import type { PART_NAME } from '@/pages/Question/types';
import { Tab } from '@sopt-makers/ui';
import { useState } from 'react';

const Header = () => {
	const [selectedTab, setSelectedTab] = useState<PART_NAME>();

	const handleTabChange = (part: PART_NAME) => {
		setSelectedTab(part);
	};

	return (
		<header>
			<Filters />
			<Tab
				selectedInitial="common"
				style="primary"
				size="md"
				onChange={handleTabChange}
				tabItems={Object.keys(PART) as PART_NAME[]}
				translator={PART}
			/>
		</header>
	);
};

export default Header;
