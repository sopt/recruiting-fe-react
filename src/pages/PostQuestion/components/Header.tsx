import Filters from '@/pages/PostQuestion/components/Filters';
import { PART } from '@/pages/PostQuestion/constant';
import type { GROUP, PART_NAME } from '@/pages/PostQuestion/types';
import { Tab } from '@sopt-makers/ui';

interface HeaderProps {
  selectedGroup: GROUP;
  handleTabChange: (part: PART_NAME) => void;
  handleGroupChange: (group: GROUP) => void;
  handleSeasonChange: (season: number) => void;
}

const Header = ({
  selectedGroup,
  handleTabChange,
  handleGroupChange,
  handleSeasonChange,
}: HeaderProps) => {
  return (
    <header>
      <Filters
        selectedGroup={selectedGroup}
        handleGroupChange={handleGroupChange}
        handleSeasonChange={handleSeasonChange}
      />
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
