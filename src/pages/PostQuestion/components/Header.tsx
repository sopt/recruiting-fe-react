import { Tab } from '@sopt-makers/ui';
import type { RefObject } from 'react';
import { IS_SOPT } from '@/constants';
import {
  Part,
  type PartType,
  SoptPart,
  type SoptPartType,
} from '@/pages/Application/\btypes';
import { COMMON_QUESTION, SOPT_COMMON } from '@/pages/Application/constants';
import Filters from '@/pages/PostQuestion/components/Filters';
import type { FilterState } from '@/pages/PostQuestion/hooks/useFilterReducer';
import type { Group } from '@/pages/PostQuestion/types';

interface HeaderProps {
  filterState: FilterState;
  handleTabChange: (part: PartType | SoptPartType) => void;
  handleGroupChange: (group: Group) => void;
  handleSeasonChange: (season: number) => void;
  targetRef: RefObject<HTMLElement | null>;
}

const tabItems = IS_SOPT
  ? (Object.keys(SoptPart) as SoptPartType[])
  : (Object.keys(Part) as PartType[]);

const selectedInitial = IS_SOPT ? SOPT_COMMON : COMMON_QUESTION;

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
        selectedInitial={selectedInitial}
        style="primary"
        size="md"
        onChange={handleTabChange}
        tabItems={tabItems}
      />
    </header>
  );
};

export default Header;
