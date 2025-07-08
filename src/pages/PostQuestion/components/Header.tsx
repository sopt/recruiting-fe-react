import Filters from '@/pages/PostQuestion/components/Filters';
import { PART } from '@/pages/PostQuestion/constant';
import type { Group, PartName } from '@/pages/PostQuestion/types';
import { Tab } from '@sopt-makers/ui';

interface HeaderProps {
  selectedGroup: Group;
  handleTabChange: (part: PartName) => void;
  handleGroupChange: (group: Group) => void;
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
        tabItems={Object.keys(PART) as PartName[]}
        translator={PART}
      />
    </header>
  );
};

export default Header;
