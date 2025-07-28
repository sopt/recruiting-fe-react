import { Part, type PartType } from "@/pages/Application/\btypes";
import Filters from "@/pages/PostQuestion/components/Filters";
import type { FilterState } from "@/pages/PostQuestion/hooks/useFilterReducer";
import type { Group } from "@/pages/PostQuestion/types";
import { Tab } from "@sopt-makers/ui";
import type { RefObject } from "react";

interface HeaderProps {
  filterState: FilterState;
  handleTabChange: (part: PartType) => void;
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
        selectedInitial={"공통" as PartType}
        style="primary"
        size="md"
        onChange={handleTabChange}
        tabItems={Object.keys(Part) as PartType[]}
        translator={Part}
      />
    </header>
  );
};

export default Header;
