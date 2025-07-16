import Filters from '@/pages/PostQuestion/components/Filters';
import { PART } from '@/pages/PostQuestion/constant';
import type { FilterState } from '@/pages/PostQuestion/hooks/useFilterReducer';
import type { Group, PartName } from '@/pages/PostQuestion/types';
import { Tab } from '@sopt-makers/ui';
import type { RefObject } from 'react';

interface HeaderProps {
  filterState: FilterState;
  handleTabChange: (part: PartName) => void;
  handleGroupChange: (group: Group) => void;
  handleSeasonChange: (season: number) => void;
  targetRef: RefObject<HTMLElement | null>;
}

const Header = ({
  filterState,
  handleTabChange,
  handleGroupChange,
  handleSeasonChange,
  targetRef,
}: HeaderProps) => {
  return (
    <header ref={targetRef}>
      <Filters
        filterState={filterState}
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
