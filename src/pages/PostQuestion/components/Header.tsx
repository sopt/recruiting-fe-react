import Filters from '@/pages/PostQuestion/components/Filters';
import { PART } from '@/pages/PostQuestion/constant';
import type { PART_NAME } from '@/pages/PostQuestion/types';
import { Tab } from '@sopt-makers/ui';
import { useState } from 'react';

const Header = () => {
  const [, setSelectedTab] = useState<PART_NAME>();

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
