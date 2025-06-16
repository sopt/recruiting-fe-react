import type { PART_NAME } from '@/pages/PostQuestion/types';
import { Tab } from '@sopt-makers/ui';
import { useState } from 'react';

const Header = () => {
  const [selectedTab, setSelectedTab] = useState<PART_NAME>();

  const handleTabChange = (part: PART_NAME) => {
    setSelectedTab(part);
  };

  return (
    <div>
      <Tab
        selectedInitial="common"
        style="primary"
        size="md"
        onChange={handleTabChange}
        tabItems={[
          'common',
          'plan',
          'design',
          'server',
          'ios',
          'android',
          'web',
        ]}
        translator={{
          common: '공통',
          plan: '기획',
          design: '디자인',
          server: '서버',
          ios: 'ios',
          android: '안드로이드',
          web: ' 웹',
        }}
      />
    </div>
  );
};

export default Header;
